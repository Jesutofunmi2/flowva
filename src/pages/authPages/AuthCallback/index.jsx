import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../../../helpers/supabaseWrapper";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await callSupabase((sb) => sb.auth.getSessionFromUrl());
        if (error) { navigate("/login"); return; }

        const user = data?.session?.user ?? null;
        if (!user?.id) { navigate("/login"); return; }

        await callSupabase((sb) =>
          sb.from("profiles").upsert(
            { id: user.id, display_name: user.user_metadata?.full_name ?? null },
            { onConflict: "id" }
          )
        );

        const ref = localStorage.getItem("referral");
        if (ref) {
          const { data: refProfile } = await callSupabase((sb) =>
            sb.from("profiles").select("id").eq("referral_code", ref).maybeSingle()
          );

          if (refProfile?.id) {
            await callSupabase((sb) =>
              sb.from("profiles").update({ referred_by: refProfile.id }).eq("id", user.id)
            );

            await callSupabase((sb) => sb.rpc("apply_referral_bonus", { p_new_user: user.id }));
          }

          localStorage.removeItem("referral");
        }

        navigate("/dashboard");
      } catch {
        navigate("/login");
      }
    })();
  }, [navigate]);

  return <div>Completing sign-in...</div>;
};

export default AuthCallback;