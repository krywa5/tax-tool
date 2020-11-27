import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { translateErrorCode } from 'utils';
import { Copyright, Loader } from 'components';
import ROUTES from 'routes';

import { auth } from 'data/service/firebase.service';


const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[20]
  },
  lockIcon: {
    color: theme.palette.common.white,
  },
}));

const LoginForm = () => {
  const [inputData, setInputData] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const submitHandler = e => {
    e.preventDefault();
    const { email, password } = inputData;
    setIsLoading(true);

    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        const message = 'Zalogowano pomyślnie.';

        toast.success(message,
          {
            position: toast.POSITION.TOP_CENTER,
          });

        setIsLoading(false);
        history.push(ROUTES.taxTool);
      })
      .catch((error) => {
        const message = translateErrorCode(error.code);

        toast.error(message,
          {
            position: toast.POSITION.TOP_CENTER,
          });

        setIsError(true);
        setIsLoading(false);
      });
  }

  const inputHandler = e => {
    setInputData(prevVal => ({
      ...prevVal,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <Container className={classes.container} component="main" maxWidth="sm" disableGutters fixed>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.lockIcon} />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Zaloguj do Tax Tool
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoading ? <Loader color='white' isSmall /> : 'Zaloguj'}
          </Button>
        </form>
      </div>
      <Box mt={1}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginForm;