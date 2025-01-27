import React from 'react'
import './Leaderboardcard.css'

const LeaderboardCard = ({leaderboard ,index}) => {
    return (
        <div className="lb-card">
            <div className="rank">{index+1}</div>
            <div className="name-title">
                <div>{leaderboard.username}</div>
                <div>{leaderboard.total_coins}</div>
            </div>
        </div>
    )
}

export default LeaderboardCard