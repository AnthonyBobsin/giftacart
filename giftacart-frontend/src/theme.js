import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    secondary: {
      main: "#e8ded1",
    },
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
    text: {
      primary: "#424242",
      secondary: "#424242"
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
