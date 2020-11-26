import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      width: '100%',
      minHeight: '100vh',
      backgroundImage: `radial-gradient(${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      padding: '50px',
    }
  }
});


const AppWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper} id="tax-tool">
      {children}
    </div>
  );
}

export default AppWrapper;