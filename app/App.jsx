import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlipMove from 'react-flip-move';
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
    setInterval(async () => {
      console.log("Checked scores");
      getScores();
    }, 30000);
    getScores();
  }, []);
  return (
  <>
    <h1>WARGAMES</h1>
    <h2>SHALL WE PLAY A GAME?</h2>
    <div className="score-table">
      <FlipMove duration={500}>
        { scores.sort((a, b) => (a.score < b.score) ? 1 : -1).map(s => <Score key={s.team_name} team_name={s.team_name} score={s.score} />) }
      </FlipMove>
    </div>
  </>
  )
};

export default App;
