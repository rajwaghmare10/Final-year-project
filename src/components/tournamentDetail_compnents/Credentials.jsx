import React, { useEffect, useState } from 'react';
import { getTeamsByTournamentId } from '../../api/api';
import './Credentials.css';

const Credentials = ({ data }) => {
  const [showRoomDetails, setShowRoomDetails] = useState(true);
  const [teams, setTeams] = useState([]);

  // Fetch registered teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (data.tournament_id) {
          const response = await getTeamsByTournamentId(data.tournament_id);
          setTeams(response.teams || []);
          console.log(response);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [data.tournament_id, data.scrim_id]);

  // Check room details availability
  useEffect(() => {
    const checkRoomDetailsAvailability = () => {
      if (data.room_id && data.room_password && data.match_timing) {
        const matchTime = new Date(data.match_timing).getTime();
        const currentTime = new Date().getTime();
        const fifteenMinutesBefore = matchTime - 15 * 60 * 1000; // Subtract 15 minutes in milliseconds

        // Show room details only if the current time is within the 15-minute window
        setShowRoomDetails(currentTime >= fifteenMinutesBefore && currentTime <= matchTime);
      }
    };

    checkRoomDetailsAvailability();
    const interval = setInterval(checkRoomDetailsAvailability, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [data.room_id, data.room_password, data.match_timing]);

  return (
    <div className="credentials-container">
      <h2>Match Credentials</h2>

      {showRoomDetails ? (
        <div className="room-details">
          <p><strong>Room ID:</strong> {data.room_id}</p>
          <p><strong>Password:</strong> {data.room_password}</p>
        </div>
      ) : (
        <p className="room-info-placeholder">Room details will be available 15 minutes before the match.</p>
      )}
      <div className="team-slot-details">
        <h2>Registered Teams</h2>
        {teams && teams.length > 0 ? (
          <table className="registered-teams-table">
            <thead>
              <tr>
                <th>Slot No</th>
                <th>Team Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={index}>
                  <td>{index + 2}</td> {/* Slot numbers start from 2 */}
                  <td>{team.team_name || 'No Team Name'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-teams-placeholder">No teams have registered yet.</p>
        )}
      </div>
    </div >
  );
};

export default Credentials;
