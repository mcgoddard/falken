import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Score from './Score.jsx';
import './main.css';

const base_url = 'https://fgq94frah7.execute-api.eu-west-2.amazonaws.com/'

const App = () => {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    const getScores = async () => {
      const result = await axios.get(base_url + 'scores');
      setScores(result.data);
    }
    getScores();
  }, [])
  return (
  <>
    <h1>WarGames - Scoreboard</h1>
    <div className="score-table">
      { scores.map(s => <Score key={s.team_name} team_name={s.team_name} score={s.score} />) }
    </div>
  </>
  )
};

export default App;
