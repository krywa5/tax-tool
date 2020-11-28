import { createMuiTheme } from '@material-ui/core/styles';

export const defaultStyles = {
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
    },
    typography: {
        fontFamily: [
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ]
    }
}

const theme = createMuiTheme(defaultStyles);

export const globalStyles = { // global CSS styles
    "@global": {
        "@keyframes rotate": {
            "to": {
                transform: "rotate(360deg)",
            }
        },
        "@keyframes fadeSlideIn": {
            "from": {
                opacity: "0",
                transform: "translateY(15px)",
            },
            "to": {
                opacity: "1",
                transform: "translateY(0)",
            }
        },
    }
}

export default theme;