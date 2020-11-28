import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { globalStyles } from 'theme';
import { LoginPage, TaxTool } from 'pages';
import { AppWrapper } from 'components';
import ROUTES from 'routes';

const useStyles = makeStyles(globalStyles);

const App = () => {
  const styles = useStyles();

  return (
    <AppWrapper>
      <Router>
        <ToastContainer />
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
