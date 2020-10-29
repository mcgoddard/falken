import React, { forwardRef } from 'react';

const Score = forwardRef(({ team_name, score }, ref) => (
    <div className='score-row' ref={ref}>
        <p className='team-name'>{team_name}</p>
        <p className='score'>{score}</p>
    </div>
));

export default Score;
