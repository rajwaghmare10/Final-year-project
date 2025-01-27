import React, { useEffect, useState } from "react";
import AdminNav from "../../components/Admin-comps/AdminNav";
import "./AdminHome.css";
import { getAllTournaments, getAllTeams, getAllUsers, getAllRegistration } from "../../api/api";

const AdminHome = () => {
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tournamentResponse, teamResponse, userResponse, registrationResponse] = await Promise.all([
          getAllTournaments(),
          getAllTeams(),
          getAllUsers(),
          getAllRegistration(),
        ]);

        setTournaments(tournamentResponse.tournaments);
        setTeams(teamResponse.teams);
        setUsers(userResponse.users);
        setRegistrations(registrationResponse.registrations);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="admin-home-content">
        <div className="admin-dashboard-cards">
          <div className="admin-card">
            <h3>Total Tournaments</h3>
            <p>{tournaments.length}</p>
          </div>
          <div className="admin-card">
            <h3>Total Teams</h3>
            <p>{teams.length}</p>
          </div>
          <div className="admin-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="admin-card">
            <h3>Registrations</h3>
            <p>{registrations.length}</p>
          </div>
        </div>

        <div className="admin-tournaments-section">
          <h2>Recent Tournaments</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <table className="admin-tournaments-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slots</th>
                  <th>Prize Pool</th>
                  <th>Registration Start Date</th>
                  <th>Registration End Date</th>
                  <th>Match Timinig</th>
                  <th>Map</th>
                  <th>Game Mode</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((tournament) => (
                  <tr key={tournament.tournament_id}>
                    <td>{tournament.tournament_id}</td>
                    <td>{tournament.tournament_name}</td>
                    <td>{tournament.total_slots}</td>
                    <td>{tournament.prizepool || "-"}</td>
                    <td>{new Date(tournament.start_date).toLocaleDateString()}</td>
                    <td>{new Date(tournament.end_date).toLocaleDateString()}</td>
                    <td>{new Date(new Date(tournament.match_timing).getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 16)}</td>
                    <td>{tournament.map || "-"}</td>
                    <td>{tournament.game_mode || "-"}</td>
                    <td>
                      <button className="admin-delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
