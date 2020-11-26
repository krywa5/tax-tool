import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { LoginPage } from 'pages';
import { AppWrapper } from 'components';


const App = () => {
  return (
    <AppWrapper>
      <LoginPage />
      <ToastContainer />
    </AppWrapper>
  );
}

export default App;
