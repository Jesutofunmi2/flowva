import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { supabase } from "./hooks/supabaseClient";
import { callSupabase } from "./helpers/supabaseWrapper";
import store from "./store";
import { Provider } from "react-redux";

export function AppWrapper() {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await callSupabase((sb) => sb.auth.getSession());
        const refresh = data?.session?.refresh_token ?? null;
        if (refresh) localStorage.setItem("refreshToken", refresh);
        else localStorage.removeItem("refreshToken");
      } catch (err) {
        console.error("getSession failed", err);
      }
    })();

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
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </StrictMode>
);