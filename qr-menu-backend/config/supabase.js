const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;