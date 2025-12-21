// src/main.jsx
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { supabase } from "./hooks/supabaseClient";

export function AppWrapper() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const refresh = data?.session?.refresh_token ?? null;
      if (refresh) localStorage.setItem("refreshToken", refresh);
      else localStorage.removeItem("refreshToken");
    });

    const { data: { subscription } = {} } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const refresh = session?.refresh_token ?? null;
        if (refresh) localStorage.setItem("refreshToken", refresh);
        else localStorage.removeItem("refreshToken");
      }
    );

    return () => subscription?.unsubscribe?.();
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);