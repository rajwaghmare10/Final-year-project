import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // Base URL for your API

// Fetch all tournaments
export const getAllTournaments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tournament/alltournament`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournaments:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Fetch all teams
export const getAllTeams = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/allteams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Fetch tournament by ID
export const getTournamentById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tournament/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournament:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Add a new tournament
export const addTournament = async (tournamentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tournament/addtournament`, tournamentData);
    return response.data;
  } catch (error) {
    console.error('Error adding tournament:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Edit an existing tournament
export const editTournament = async (id, tournamentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tournament/edit/${id}`, tournamentData);
    return response.data;
  } catch (error) {
    console.error('Error updating tournament:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete a tournament
export const deleteTournament = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tournament/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting tournament:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Fetch teams for a specific tournament by Tournament ID
export const getTeamsByTournamentId = async (tournamentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/${tournamentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams for tournament:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const addCoinsToTeamLeader = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teams/addcoins`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding coins to team leader:', error.response?.data?.message || error.message);
    throw error;
  }
};



// Fetch all scrims
export const getAllScrims = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scrim/allscrims`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scrims:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Fetch scrim by ID
export const getScrimById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scrim/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scrim:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Add a new scrim
export const addScrim = async (scrimData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/scrim/addscrim`, scrimData);
    return response.data;
  } catch (error) {
    console.error('Error adding scrim:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Edit an existing scrim
export const editScrim = async (id, scrimData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/scrim/edit/${id}`, scrimData);
    return response.data;
  } catch (error) {
    console.error('Error updating scrim:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete a scrim
export const deleteScrim = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/scrim/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting scrim:', error.response?.data?.message || error.message);
    throw error;
  }
};

