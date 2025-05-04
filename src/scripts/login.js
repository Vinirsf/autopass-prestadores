import { supabase } from 'public/supabaseClient.js';

const form = document.getElementById('login-form');
const errorMsg = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        errorMsg.textContent = error.message;
    } else {
        window.location.href = '/src/app/views/dashboard.html';
    }
});
