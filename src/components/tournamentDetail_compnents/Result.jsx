import React from 'react';
import './Result.css';

const Result = ({ matchResults = [] }) => {
  return (
    <div className="result-container">
      <h2>Match Results</h2>
      {matchResults.length > 0 ? (
        <table className="result-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Kills</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {matchResults.map((result, index) => (
              <tr key={index}>
                <td>{result.rank || index + 1}</td>
                <td>{result.team_name || 'Unknown Team'}</td>
                <td>{result.kills || 0}</td>
                <td>{result.total_points || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">Results will be displayed after the match.</p>
      )}
    </div>
  );
};

export default Result;
