import { supabase } from "./supabase";

export async function autoBlockOverdue() {
  await supabase.rpc("process_billing");
}