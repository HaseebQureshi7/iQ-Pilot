import { createTheme, PaletteMode } from "@mui/material";

const ProjectTheme = (themeMode: PaletteMode) =>
    createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: "#2997FC",
            },
            secondary: {
                main: "#9329FC",
            },
            text: {
                primary: '#212A3B',
            },
        },
        typography: {
            fontFamily: "Lato"
        }
    });

export default ProjectTheme