import { supabase } from './supabaseClient.js';

(async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        window.location.href = '/src/app/views/dashboard.html';
    } else {
        window.location.href = '/src/app/views/login.html';
    }
})();
