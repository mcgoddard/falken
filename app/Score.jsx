import React, { forwardRef } from 'react';

const Score = forwardRef(({ team_name, score }, ref) => (
    <div className='score-row' ref={ref}>
        <h3 className='team-name'>{team_name}</h3>
        <h3 className='score'>{score}</h3>
    </div>
));

export default Score;
