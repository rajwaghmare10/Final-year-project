import React, { useState } from "react";
import { getTeamsByTournamentId, updateResult } from "../../api/api";
import "./AdminResult.css";

const AdminResult = ({ type }) => {
  const [id, setId] = useState("");
  const [teams, setTeams] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTeamsByTournamentId(id, type);
      if (response.teams && response.teams.length > 0) {
        setTeams(response.teams);
        setResults(
            response.teams.map((team) => ({
              team_id: team.team_id,
              kills: 0,
              rank: 0,
              total_points: 0,
              type : type, // Include type in each result
            }))
          );          
      } else {
        setTeams([]);
        setError(
          `No teams found for the provided ${type === "tournament" ? "Tournament" : "Scrim"} ID.`
        );
      }
    } catch (err) {
      console.error("Error fetching teams:", err);
      setError(
        `Failed to fetch teams. Please check the ${type === "tournament" ? "tournament" : "scrim"} ID.`
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPoints = (kills, rank) => {
    let rankPoints = 0;
    if (rank === 1) rankPoints = 15;
    else if (rank === 2) rankPoints = 12;
    else if (rank === 3) rankPoints = 10;
    else if (rank >= 4 && rank <= 10) rankPoints = 14 - rank;
    else rankPoints = 0;

    return kills + rankPoints;
  };

  const handleResultChange = (teamId, field, value) => {
    setResults((prev) =>
      prev.map((result) =>
        result.team_id === teamId
          ? {
              ...result,
              [field]: value,
              total_points:
                field === "kills" || field === "rank"
                  ? calculateTotalPoints(
                      field === "kills" ? value : result.kills,
                      field === "rank" ? value : result.rank
                    )
                  : result.total_points,
              type: type, // Ensure type is included
            }
          : result
      )
    );
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateResult({results});
      alert(
        `${type === "tournament" ? "tournament" : "scrim"} results updated successfully!`
      );
      setResults([]);
      setTeams([]);
      setId("");
      setError('');
    } catch (err) {
      console.error("Error updating results:", err);
      setError("Failed to update results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-result">
      <div className="admin-result__form-group">
        <label>{type === "tournament" ? "Tournament ID" : "Scrim ID"}</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder={`Enter ${type === "tournament" ? "Tournament" : "Scrim"} ID`}
        />
        <button type="button" onClick={fetchTeams} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Details"}
        </button>
      </div>

      {error && <p className="admin-result__error">{error}</p>}

      {loading && !error && <p>Loading...</p>}

      {teams.length > 0 && !loading && (
        <>
          <h2 className="admin-result__title">
            Update {type === "tournament" ? "Tournament" : "Scrim"} Results
          </h2>
          <form onSubmit={handleSubmit}>
            <table className="admin-result__table">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Kills</th>
                  <th>Rank</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => {
                  const result = results.find(
                    (result) => result.team_id === team.team_id
                  ) || { kills: 0, rank: null, type: type };

                  return (
                    <tr key={team.team_id}>
                      <td>{team.team_name}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={result.kills}
                          onChange={(e) =>
                            handleResultChange(
                              team.team_id,
                              "kills",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={result.rank || ""}
                          onChange={(e) =>
                            handleResultChange(
                              team.team_id,
                              "rank",
                              parseInt(e.target.value) || null
                            )
                          }
                        />
                      </td>
                      <td>{calculateTotalPoints(result.kills, result.rank)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button type="submit" className="admin-result__submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Results"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AdminResult;
