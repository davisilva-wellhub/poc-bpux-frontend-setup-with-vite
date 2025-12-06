import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import { wellhub } from "@gympass/tai-chi";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import "@gympass/tai-chi/index.css";
// import "config/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MuiThemeProvider theme={wellhub}>
      <App />
    </MuiThemeProvider>
  </StrictMode>,
);
