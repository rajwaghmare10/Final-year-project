import React, { useState, useEffect, useCallback } from 'react';
import './Createteam.css';
import { createTeam, getTeamMembers, registerTeam } from '../../api/api';

const CreateTeam = ({ closeCreateTeam, id, type, gameMode }) => {
    const [teamName, setTeamName] = useState('');
    const [leaderBgmiUsername, setLeaderBgmiUsername] = useState('');
    const [teamID, setTeamID] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // 🔹 State to store backend errors

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchTeamMembers = useCallback(async (team_id) => {
        try {
            if (!team_id || !user?.id || !id || !type) return;
        
            const response = await getTeamMembers(user.id, id, type);

            if (response && response.members) {
                console.log("Fetched members:", response.members);
                
                const uniqueMembers = Array.from(new Set(response.members.map(m => m.bgmi_id)))
                    .map(bgmi_id => response.members.find(m => m.bgmi_id === bgmi_id));

                setTeamMembers(uniqueMembers);
            } else {
                setTeamMembers([]);
            }
        } catch (error) {
            console.error('Error fetching team members:', error);
            setTeamMembers([]);
        }
    }, [user?.id, id, type]);

    const fetchTeam = useCallback(async () => {
        try {
            if (!user?.id || !id || !type) {
                console.error("Missing parameters in fetchTeam:", { userId: user?.id, id, type });
                return;
            }

            const response = await getTeamMembers(user.id, id, type);

            if (response?.team) {
                setTeamID(response.team.team_id);
                setIsRegistered(response.team.is_registered);
            }
        } catch (error) {
            console.error('Error fetching team data:', error);
        }
    }, [user?.id, id, type]);

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

    useEffect(() => {
        if (teamID) {
            fetchTeamMembers(teamID);
        }
    }, [teamID, fetchTeamMembers]);

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // 🔹 Reset error message before making a new request

        const teamDetail = {
            team_name: teamName,
            leader_id: user.id,
            game_mode: gameMode,
            type,
            in_bgmi_username: leaderBgmiUsername,
            tournament_or_scrim_id: id
        };

        try {
            const response = await createTeam(teamDetail);
            if (response?.team?.team_id) {
                setTeamID(response.team.team_id);
                setIsRegistered(false);
            }
        } catch (error) {
            console.error('Error creating team:', error);
            setErrorMessage(error.response?.data?.message || 'Failed to create team. Please try again.');
        }
    };

    const handleRegisterTeam = async () => {
        setErrorMessage(''); // 🔹 Reset error message before making a new request

        try {
            await registerTeam({ team_id: teamID, tournament_or_scrim_id: id, type });
            setIsRegistered(true);
        } catch (error) {
            console.error('Error registering team:', error);
            setErrorMessage(error.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="createTeam-container">
            <div className="createTeam-content">
                <span onClick={closeCreateTeam} className="close-btn">&times;</span>
                <div className="createTeam-title">
                    <h3>{teamID ? "Your Team Details" : "Create Your Team"}</h3>
                </div>

                {/* 🔹 Display error message if exists */}
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}

                {!teamID ? (
                    <div className="createTeam-section">
                        <form onSubmit={handleCreateTeam}>
                            <div className="input-group">
                                <label>Team Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Team Name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Enter Your Ingame Name in BGMI</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Ingame Name in BGMI"
                                    value={leaderBgmiUsername}
                                    onChange={(e) => setLeaderBgmiUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="submit-btn-container">
                                <button type="submit" className="createTeam-btn">Generate Team Code</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="team-details-section">
                        <h4>Team Created Successfully!</h4>
                        <p><strong>Team Code:</strong> {teamID}</p>
                        <h5>Team Members ({teamMembers.length})</h5>

                        <ul className="team-members-list">
                            {teamMembers.length > 0 ? (
                                teamMembers.map((member, index) => (
                                    <li key={index}>{member.user_name || member.bgmi_id}</li>
                                ))
                            ) : (
                                <p>No members have joined the team yet.</p>
                            )}
                        </ul>

                        {isRegistered ? (
                            <div className="success-message">
                                <h4>Team registered successfully!</h4>
                            </div>
                        ) : (
                            <div className="register-btn-container">
                                <button onClick={handleRegisterTeam} className="register-btn">
                                    Register Team
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateTeam;
