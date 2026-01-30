
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgwvvnuoubisqwrchzhq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnd3Z2bnVvdWJpc3F3cmNoemhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDg2MzQsImV4cCI6MjA4NDQ4NDYzNH0.9LVdkf7uTuPjHp5advHhqHmOVhr-p8iAEEc89p2PM9c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
