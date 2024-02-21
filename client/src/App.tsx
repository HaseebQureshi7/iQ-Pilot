import { Box, PaletteMode, ThemeProvider } from "@mui/material";
import MainRouter from "./router/MainRouter";
import ProjectTheme from "./style_extensions/ProjectTheme";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  return (
    <ThemeProvider theme={ProjectTheme(themeMode)}>
      <Box
        sx={{
          maxWidth: "100vw",
          minHeight: "100vh",
          color: "text.primary",
          background: "background.default",
          overflowX:"hidden"
        }}
      >
        <MainRouter />
        <ReactQueryDevtools />
      </Box>
    </ThemeProvider>
  );
}

export default App;
