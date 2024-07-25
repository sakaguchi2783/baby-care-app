// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cwmpzcqnjlbfmximqkkq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bXB6Y3FuamxiZm14aW1xa2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxNTI4OTYsImV4cCI6MjAzNTcyODg5Nn0.XqvAcTHBN0AeKUkS7q0VNYlcASKy02nBJJV7kcdDYmc'
export const supabase = createClient(supabaseUrl, supabaseKey)
