import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wpzulvmydnxplntuwgol.supabase.co';
const supabaseKey = 'sb_publishable_unG6XlyvocRYPnRh4027vA_1Kf38';

export const supabase = createClient(supabaseUrl, supabaseKey);