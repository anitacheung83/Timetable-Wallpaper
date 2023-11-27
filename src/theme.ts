import { PaletteColorOptions, createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Palette {
        tertiary: PaletteColorOptions;
    }

    interface PaletteOptions {
        tertiary: PaletteColorOptions;
    }
}

declare module '@mui/material/styles' {
    interface TypographyVariants {
        poster: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        poster?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        poster: true;
    }
}
const { palette } = createTheme();


export function getTheme(darkMode: boolean) {
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: "#C2B8A3",
                dark: "#000000"
            },
            secondary: {
                main: "#DAD6CE",
                dark: "#000000"
            },
            info: {
                main: darkMode ? "#DAD6CE" : "#000000"
            },
            tertiary: palette.augmentColor({
                color: {
                    main: "#00ff00"
                }
            }),
            background: {
                default: darkMode ? "#121212" : "#DAD6CE"
            }
        },
        typography: {
            h1: {
                fontFamily: "'DM Serif Display', serif",
                color: darkMode ? "#DAD6CE" : "black"
            },
            h3: {
                fontFamily: "'DM Serif Display', serif",
                color: darkMode ? "#DAD6CE" : "black"
            },
            h4: {
                fontFamily: "'DM Serif Display', serif",
                color: darkMode ? "#DAD6CE" : "black",
                fontSize: "2rem"
            },
            h5: {
                fontFamily: "'DM Serif Display', serif",
                color: darkMode ? "#DAD6CE" : "black"
            },
            h6: {
                fontFamily: "'DM Serif Display', serif",
                color: darkMode ? "#DAD6CE" : "black"
            },
            body1: {
                fontFamily: "'Quicksand', sans-serif",
                color: darkMode ? "#DAD6CE" : "black"
            },
            body2: {
                fontFamily: "'Quicksand', sans-serif",
                color: darkMode ? "#DAD6CE" : "black"
            },
            subtitle2: {
                fontFamily: "'Quicksand', sans-serif",
                color: darkMode ? "#DAD6CE" : "black"
            },
            caption: {
                fontFamily: "'Quicksand', sans-serif",
                color: darkMode ? "#DAD6CE" : "black"
            },
            button: {
                fontFamily: "'Quicksand', sans-serif",
                color: darkMode ? "#DAD6CE" : "black"
            }

        },
        components: {
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        margin: "4px 14px",
                        border: "1px solid !important",
                        borderRadius: "10px !important",
                        "&.Mui-selected": {
                            backgroundColor: darkMode ? "#DDDDDD66" : "#00000024",
                        },
                        "&.Mui-selected:hover": {
                            backgroundColor: darkMode ? "#DDDDDD66" : "#00000024",
                        },
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none"
                    }
                }
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        MuiMultiSectionDigitalClockSection: {
                            styleOverrides: {

                                backgroundColor: darkMode ? "#DDDDDD66" : "#00000024",
                                "&.Mui-selected: hover": {
                                    backgroundColor: darkMode ? "#DDDDDD66 !important" : "#00000024 !important",
                                },
                                "&.Mui-selected: focus-visible": {
                                    backgroundColor: darkMode ? "#DDDDDD66" : "#00000024",
                                },
                            }
                        }
                    }
                }
            },

        }
    }
    )

    return theme
}
