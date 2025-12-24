
import { supabase } from "../hooks/supabaseClient";
import store from "../store";
import { setApiErrorMessage } from "../store/modules/apiErrorHandler";


export async function callSupabase(fn) {
  try {
    const res = await fn(supabase);

    if (res?.error) {
      const msg = res.error?.message || "Request failed";
      store.dispatch(setApiErrorMessage({ message: msg }));
      throw res.error;
    }

    return res;
  } catch (err) {
    const msg = err?.message || "Network error";
    store.dispatch(setApiErrorMessage({ message: msg }));
    throw err;
  }
}