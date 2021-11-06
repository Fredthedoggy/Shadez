const colors = require("tailwindcss/colors");
module.exports = {
    theme: {
        colors: {
            white: colors.white,
            main: {
                50: '#f7f7fe',
                100: '#eef0fe',
                200: '#d5d9fc',
                300: '#bcc1fa',
                400: '#8a93f6',
                500: '#5865f2',
                600: '#4f5bda',
                700: '#424cb6',
                800: '#353d91',
                900: '#2b3177',
            },
            discord: {
                50: "#f2f2f3",
                100: "#e9eaea",
                200: "#dcddde",
                300: "#b9bbbe",
                400: "#72767d",
                500: '#4f545c',
                600: '#36393f',
                700: '#2f3136',
                800: '#292b2f',
                900: '#18191c',
                warning: '#faa819',
                danger: "#ed4245",
                positive: "#4fdc7c"
            }
        },
        extend: {
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    variants: {
        extend: {
            borderColor: ['focus-visible'],
            opacity: ['disabled'],
        },
    },
};
