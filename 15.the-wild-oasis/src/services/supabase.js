import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tazhiztgthamqrvqpwzn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhemhpenRndGhhbXFydnFwd3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NDM5NTYsImV4cCI6MjA3MzUxOTk1Nn0.cUQKEGVzDx56jPb6WG5MbzsBkZKLLqI44fv2CnOdAQc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
