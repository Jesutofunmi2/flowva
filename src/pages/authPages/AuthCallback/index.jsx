import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callSupabase } from "../../../helpers/supabaseWrapper";
import { supabase } from "../../../hooks/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData?.session?.user;

        if (!user?.id) {
          navigate("/login");
          return;
        }

        await callSupabase((sb) =>
          sb.from("profile").upsert(
            {
              id: user.id,
              full_name: user.user_metadata?.full_name ?? null,
            },
            { onConflict: "id" }
          )
        );


         await callSupabase((sb) =>
          sb.from("profiles").upsert(
            {
              id: user.id,
              display_name: user.user_metadata?.full_name ?? null,
            },
            { onConflict: "id" }
          )
        );

        /**
         * ✅ Handle referral
         */
        const ref = localStorage.getItem("referral");

        if (ref) {
          const { data: refProfile } = await callSupabase((sb) =>
            sb
              .from("profiles")
              .select("id")
              .eq("referral_code", ref)
              .maybeSingle()
          );

          if (refProfile?.id) {
            await callSupabase((sb) =>
              sb
                .from("profiles")
                .update({ referred_by: refProfile.id })
                .eq("id", user.id)
            );

            await callSupabase((sb) =>
              sb.rpc("apply_referral_bonus", { p_new_user: user.id })
            );
          }

          localStorage.removeItem("referral");
        }

        /**
         * ✅ Fetch role
         */
        const { data: profile } = await callSupabase((sb) =>
          sb.from("profiles").select("role").eq("id", user.id).single()
        );

        const role = profile?.role;

        if (role === "admin") {
          navigate("/admin_dashboard", { replace: true });
        } else if (role === "candidate") {
          navigate("/candidate_dashboard", { replace: true });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    handleAuth();
  }, [navigate]);

  return <div>Completing sign-in...</div>;
};

export default AuthCallback;