import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import './index.scss';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import theme from 'theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
