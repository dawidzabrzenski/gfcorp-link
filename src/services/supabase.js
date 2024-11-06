import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gridmyrmxhylfpfqoawr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyaWRteXJteGh5bGZwZnFvYXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4ODY2OTcsImV4cCI6MjA0MTQ2MjY5N30.QG6GMUa_XwD030Ue5UF1_iHL31KYyoDUrRkFnE7sSvM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
