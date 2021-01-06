import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Logo } from 'components';

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      width: '100%',
      minHeight: '100vh',
      maxWidth: 'unset',
      backgroundImage: `radial-gradient(${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      padding: '50px',
      boxSizing: 'border-box',

      "@media print": {
        padding: '0',
      }
    },
    logo: {
      position: 'fixed',
      top: '48px',
      left: '48px',

      "@media (max-width: 1730px)": {
        top: '-10px',
      }
    }
  }
});


const AppWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <Container component="div" className={classes.wrapper} id="tax-tool">
      <Logo isSecondary className={`${classes.logo} no-print`} />
      {children}
    </Container>
  );
}

export default AppWrapper;