import React from 'react';

const Score = ({ team_name, score }) => (
    <div className='score-row'>
        <p className='team-name'>{team_name}</p>
        <p className='score'>{score}</p>
    </div>
);

export default Score;
