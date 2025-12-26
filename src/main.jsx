import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { supabase } from "./hooks/supabaseClient";
import { callSupabase } from "./helpers/supabaseWrapper";
import store from "./store";
import { Provider } from "react-redux";
import { ApiErrorHandler } from "./components/common";

export function AppWrapper() {
  useEffect(() => {
    (async () => {
      const { data } = await callSupabase((sb) => sb.auth.getSession());
      const refresh = data?.session?.refresh_token ?? null;
      if (refresh) localStorage.setItem("refreshToken", refresh);
      else localStorage.removeItem("refreshToken");
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

  useEffect(() => {
  if (!navigator.onLine) {
    window.location.href = "/onboarding";
    return;
  }

  const onOffline = () => window.location.href = "/onboarding";
  const onOnline = () => {};

  window.addEventListener("offline", onOffline);
  window.addEventListener("online", onOnline);

  return () => {
    window.removeEventListener("offline", onOffline);
    window.removeEventListener("online", onOnline);
  };
}, []);
  return <App />;
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper />
      <ApiErrorHandler />
    </Provider>
  </StrictMode>
);
