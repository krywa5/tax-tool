import { makeStyles } from '@material-ui/core/styles'
import { Logo } from 'components';

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      width: '100%',
      minHeight: '100vh',
      backgroundImage: `radial-gradient(${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      padding: '50px',
      boxSizing: 'border-box',
    }
  }
});


const AppWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper} id="tax-tool">
      <Logo isSecondary />
      {children}
    </div>
  );
}

export default AppWrapper;