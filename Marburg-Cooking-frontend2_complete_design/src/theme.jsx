import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7EBC89",   // Hauptfarbe
    },
    secondary: {
      main: "#FE5D26",   // Akzentfarbe
    },
    background: {
      default: "#FAEDCA",  // Hintergrundfarbe
      paper: "#C1DBB3",    // Card-Hintergrund
    },
    warning: {
      main: "#F2C078", // optional
    }
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
