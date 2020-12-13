import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { makeStyles, styled } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import theme, { globalStyles } from 'theme';
import { LoginPage, TaxTool } from 'pages';
import { AppWrapper } from 'components';
import ROUTES from 'routes';

const useStyles = makeStyles(globalStyles);

const MyToastContainer = styled(ToastContainer)({
  "& .Toastify__toast": {
    padding: '25px',
    fontSize: '14px',
    borderRadius: '4px',
    boxShadow: theme.shadows[7],
  },
  "& .Toastify__close-button": {
    position: 'absolute',
    top: '10px',
    right: '10px',
  }
})


const App = () => {
  useStyles();

  return (
    <AppWrapper>
      <Router>
        <MyToastContainer />
        <Switch>
          <Route path="/" exact>
            <Redirect to={ROUTES.taxTool} />
          </Route>
          <Route path={ROUTES.taxTool}>
            <TaxTool />
          </Route>
          <Route path={ROUTES.loginPage}>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  );
}

export default App;
