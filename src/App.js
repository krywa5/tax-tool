import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { makeStyles } from '@material-ui/styles';

import { LoginPage } from 'pages';
import { AppWrapper } from 'components';

const useStyles = makeStyles({ // global CSS styles
  "@global": {
    "@keyframes rotate": {
      "to": {
        transform: "rotate(360deg)",
      }
    }
  }
})



const App = () => {

  return (
    <AppWrapper>
      <LoginPage />
      <ToastContainer />
    </AppWrapper>
  );
}

export default App;
