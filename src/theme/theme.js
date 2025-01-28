// src/theme/theme.js
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#2e3545",
            },
            "&:hover fieldset": {
              borderColor: "#2e3545",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2e3545",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#82a0b8",
          },
          "& .MuiInputBase-input": {
            color: "#fff",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
    white: {
      main: "#fdfdfd",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  spacing: 8,
});

export default theme;
