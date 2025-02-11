import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // Base URL for your API

//login user
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during login request:', error.response?.data || error.message);
  }
};

//send otp
export const sendOtp = async ({ email }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, { email });
    return response.data;
  } catch (error) {
    console.error('Error during send otp request:', error.response?.data || error.message);
  }
}

//otp verification
export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
      email
      , otp
    });
    return response.data;
  } catch (error) {
    console.error('Error during otp verification request:', error.response?.data || error.message);
  }
}


//register user 
export const register = async (userInfo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, userInfo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//update password
export const updatePassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/updatePassword`, {
      email, newPassword
    })
    return response.data;
  }
  catch (error) {
    console.error('Error during update password request:', error.response?.data || error.message);
  }
}


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

//fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/allusers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error.response?.data?.message || error.message);
    throw error;
  }
}

//fetch all team registration
export const getAllRegistration = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/allregistration`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error.response?.data?.message || error.message);
    throw error;
  }
}

// fetch user by id
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error.response?.data?.message || error.message);
    throw error;
  }

}

//update user
export const updateUser = async (bgmiID, updateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${bgmiID}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response?.data?.message || error.message);
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
export const getTeamsByTournamentId = async (tournamentId, type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/${tournamentId}/${type}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams for tournament:', error.response?.data?.message || error.message);
    throw error;
  }
};

//adding coins to team members
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

export const getLeaderboardData = async (type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaderboard?type=${type}`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching leaderboard data:', error.response?.data?.message || error.message);
    throw error;
  }
};

//create a team
export const createTeam = async (teamData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teams/create`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error.response?.data?.message || error.message);
    throw error;
  }
};

//get team members by team id
export const getTeamMemberbyid = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error.response?.data?.message || error.message);
    throw error;
  }
};

//get team members by team id for specific tournament and scrim
export const getTeamMembers = async (userid , id ,type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/${userid}/${id}/${type}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const registerTeam = async (teamData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teams/register`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error registering team:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const joinTeam = async (teamData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teams/join`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error joining team:', error.response?.data?.message || error.message);
    throw error;
  }
}

export const updateResult = async (teamData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/teams/updateResult`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error updating result:', error.response?.data?.message || error.message);
    throw error;
  }
}

export const checkIfUserJoinedTeam = async (userID, tournamentID, type) => {
  const response = await fetch(`/teams/check-user-joined?userID=${userID}&tournamentID=${tournamentID}&type=${type}`);
  return response.json();
};


