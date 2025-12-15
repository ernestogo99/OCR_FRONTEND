import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#DFDFDF",
      light: "#ffffff",
      dark: "#ffffff",
      contrastText: "#401e55",
    },

    background: {
      default: "#fef7f7",
      paper: "#ffffff",
    },
  },

  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#401e55",
        },
      },
    },
  },

  typography: {
    allVariants: {
      color: "#401e55",
    },
  },
});
