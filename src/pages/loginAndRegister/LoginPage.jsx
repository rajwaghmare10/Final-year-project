import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Login.css';
import { login } from '../../api/api';

const LoginPage = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors
        setLoading(true); // Show loading state
    
        if (!email || !password) {
            setErrorMessage('Please fill in both fields');
            setLoading(false);
            return;
        }
    
        try {
            // Call the login API with correct payload
            const response = await login({ email, password });
            const { token, user } = response;
    
            // Save token and user details to localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
    
            // Optionally, update the parent component with login status
            if (handleLogin) {
                handleLogin(user);
            }
    
            // Navigate to the homepage or dashboard
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage(error.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="signup-link">
                    Don't have an account? <NavLink to="/register">Register</NavLink>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
