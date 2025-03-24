import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="home-container">
            <h2>Welcome to Friend Finder</h2>
            <p><strong>Token:</strong> {token ? token : "No token found"}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
