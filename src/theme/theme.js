import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#64c1ff',
            main: '#0091ea',
            dark: '#0064b7',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffd95a',
            main: '#f9a825',
            dark: '#c17900',
            contrastText: '#000',
        },
        background: {
            default: '#eee'
        }
    }
});

export const globalStyles = { // global CSS styles
    "@global": {
        "@keyframes rotate": {
            "to": {
                transform: "rotate(360deg)",
            }
        }
    }
}

export default theme;