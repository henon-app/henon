import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wpzulvmydnxplntuwgol.supabase.co';
const supabaseKey = 'sb_publishable_unG6XlyvocRYPnRh4O27vA_1Kf38bhi';

export const supabase = createClient(supabaseUrl, supabaseKey);