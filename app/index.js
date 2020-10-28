import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

// This is the linking file between the pure world of React
// and the web browser DOM

render(<App />, document.querySelector('main'));

if (module.hot) {
  module.hot.accept();
}
