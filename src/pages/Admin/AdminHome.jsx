import React, { useEffect, useState } from "react";
import AdminNav from "../../components/Admin-comps/AdminNav";
import "./AdminHome.css";
import { getAllTournaments } from "../../api/api";

const AdminHome = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getAllTournaments();
        setTournaments(response.tournaments);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
        setError("Failed to fetch tournaments");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
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
            <p>25</p>
          </div>
          <div className="admin-card">
            <h3>Total Users</h3>
            <p>300</p>
          </div>
          <div className="admin-card">
            <h3>Registrations</h3>
            <p>150</p>
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
                  <th>Start Date</th>
                  <th>End Date</th>
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
