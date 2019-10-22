import React from 'react';
import { record } from 'rrweb';

import Routes from './routes'

import './styles.css';

const intervals = [];
record({
  emit(event) {
    intervals.map(item => clearInterval(item));
    intervals.push(setTimeout(() => {
      console.log(event);
    }, 500))
  },
});

const App = () => (
  <div className="App">
    <Routes />
  </div>
);

export default App;
