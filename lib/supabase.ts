import { createClient } from "@supabase/supabase-js";

const SURL = process.env.NEXT_PUBLIC_SUPABSE1URL!;
const SSECRET = process.env.NEXT_PUBLIC_SUPABSE1SECRET!;

export const supabase = createClient(SURL, SSECRET);
