import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // Updated base URL for tournaments

// Fetch all tournaments
export const getAllTournaments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tournament/alltournament`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournaments:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch tournament by ID
export const getTournamentById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tournament/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournament:', error.response?.data || error.message);
    throw error;
  }
};

// Add a new tournament
export const addTournament = async (tournamentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tournament/addtournament`, tournamentData);
    return response.data;
  } catch (error) {
    console.error('Error adding tournament:', error.response?.data || error.message);
    throw error;
  }
};

// Edit an existing tournament
export const editTournament = async (id, tournamentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tournament/edit/${id}`, tournamentData);
    return response.data;
  } catch (error) {
    console.error('Error updating tournament:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a tournament
export const deleteTournament = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tournament/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting tournament:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch teams for a specific tournament
export const getTeamsByTournamentId = async (tournamentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/${tournamentId}`);
    return response.data; // assuming response contains the teams data
  } catch (error) {
    console.error('Error fetching teams for tournament:', error.response?.data || error.message);
    throw error;
  }
};
