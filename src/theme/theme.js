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
        ],
        h4: {
            fontSize: '1.7rem',
            marginBottom: '.5rem',
        }
    },
    transitions: {
        duration: {
            medium: 500,
            long: 750,
        }
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
        ".no-print": {
            "@media print": {
                display: 'none !important',
            }
        },
        ".only-print": {
            display: 'none !important',
            "@media print": {
                display: 'inline-block !important',
            }
        }
    }
}

export default theme;