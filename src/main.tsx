import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppDrawerprovider } from "./shared/contexts/drawercontext.tsx";
import { AppThemeProvider } from "./shared/contexts/themecontext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppDrawerprovider>
      <AppThemeProvider>
        <Toaster />
        <App />
      </AppThemeProvider>
    </AppDrawerprovider>
  </StrictMode>
);
