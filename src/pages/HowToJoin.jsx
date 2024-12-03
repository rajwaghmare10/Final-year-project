import React, { useContext } from 'react'
import { togglecontext } from '../context/context'
import './HowToJoin.css';

const HowToJoin = () => {
    const isOpen = useContext(togglecontext)
    return (
        <div className={`home-content ${isOpen ? 'sidebar-open' : ''}`}>
            <div className="how-to-join-container">
                <h2>How to Join a Tournament</h2>
                <p>Follow these simple steps to participate in our tournaments and scrims!</p>

                <div className="steps">
                    <div className="step">
                        <h3>Step 1: Register an Account</h3>
                        <p>Create an account on our platform by providing basic details like your username, email, and BGMI ID. This will allow you to track your progress and participate in events.</p>
                    </div>

                    <div className="step">
                        <h3>Step 2: Choose a Tournament</h3>
                        <p>Navigate to the "Tournaments" or "Scrims" section, and browse available events. Each event will display details such as prize pool, start time, and team requirements.</p>
                    </div>

                    <div className="step">
                        <h3>Step 3: Register for the Event</h3>
                        <p>Click on the tournament you wish to join, and complete the registration process. Make sure all team members are registered if it’s a squad event.</p>
                    </div>

                    <div className="step">
                        <h3>Step 4: Join the Lobby</h3>
                        <p>Check the tournament details for the lobby ID and password. Join the lobby at the scheduled time, and be ready to compete!</p>
                    </div>

                    <div className="step">
                        <h3>Step 5: Play and Win!</h3>
                        <p>Follow the rules, play fairly, and try your best to win! The top teams will receive coins and rewards as per the prize distribution list.</p>
                    </div>
                </div>

                <p className="note">Note: Make sure to check in at least 15 minutes before the start time to confirm your spot in the lobby.</p>
            </div>
        </div>
    );
};

export default HowToJoin;
