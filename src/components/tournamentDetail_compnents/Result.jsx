import React, { useState, useEffect } from "react";
import "./Result.css";
import { getTeamsByTournamentId } from "../../api/api";

const Result = ({ data, type }) => {
  const [matchResults, setMatchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!data.tournament_id && !data.scrim_id) return; 

      try {
        setLoading(true);
        setError("");

        const results = await getTeamsByTournamentId(data.tournament_id || data.scrim_id, type);

        // Fix: Extract teams array from API response
        const teams = results?.teams || [];

        setMatchResults(teams);
      } catch (err) {
        setError("Failed to load results. Please try again.");
        setMatchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [data, type]);

  return (
    <div className="result-container">
      <h2>Match Results</h2>

      {loading && <p className="loading">Loading results...</p>}
      {error && <p className="error-message">{error}</p>}

      {matchResults.length > 0 ? (
        <table className="result-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Total Members</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {matchResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result.team_name || "Unknown Team"}</td>
                <td>{result.total_members || 0}</td>
                <td>{result.total_points || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="no-results">Results will be displayed after the match.</p>
      )}
    </div>
  );
};

export default Result;
