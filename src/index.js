import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import 'modern-css-reset';
import 'fontsource-roboto';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import theme from 'theme';
import { defaultStyles } from 'theme'
import { Loader } from 'components';
import AppProvider from 'context/UserContext';



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<Loader isFullscreen color={defaultStyles.palette.primary.main} />}>
        <AppProvider>
          <App />
        </AppProvider>
      </React.Suspense>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
