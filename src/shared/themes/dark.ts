import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#DFDFDF",
      light: "#ffffff",
      dark: "#ffffff",
      contrastText: "#000000",
    },

    background: {
      default: "#2A2A2A",
      paper: "#303134",
    },
  },

  typography: {
    allVariants: {
      color: "white",
    },
  },

  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});
