import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import { JustifyingContext } from './Contexts/JustifyingContext';
import RemoveItemContext from './Contexts/RemoveItemContext';

ReactDOM.render(
  <React.StrictMode>
    <RemoveItemContext>
      <JustifyingContext>
          <Router>
            <App />
          </Router>
      </JustifyingContext>
    </RemoveItemContext>
  </React.StrictMode>,
  document.getElementById('root')
);

