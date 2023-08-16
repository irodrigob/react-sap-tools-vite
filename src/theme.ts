import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: [
      '"72"',
      '"72full"',
      "Arial",
      "Roboto",
      "Helvetica",
      "sans-serif",
    ].join(","),
  },
});

export default theme;
