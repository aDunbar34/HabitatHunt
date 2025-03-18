import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dslaqavsmmsvjtgbbzud.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbGFxYXZzbW1zdmp0Z2JienVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMjk3NzgsImV4cCI6MjA1NzkwNTc3OH0.wDnIiLVB80BQEV4HFP-jLnMbpRDWsnhIeKKXPH_QyVI";

export const supabase = createClient(supabaseUrl, supabaseKey);