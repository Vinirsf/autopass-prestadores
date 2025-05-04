import { supabase } from 'public/supabaseClient.js';

async function fetchAppointments() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return (window.location.href = 'login.html');

    const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('prestador_id', user.id)
        .order('horario', { ascending: true });

    const container = document.getElementById('appointments');
    if (error) {
        container.innerHTML = `<p>Erro: ${error.message}</p>`;
    } else if (data.length === 0) {
        container.innerHTML = '<p>Nenhum agendamento para hoje.</p>';
    } else {
        container.innerHTML = data.map(appt => `
      <div>
        <strong>${appt.cliente}</strong> às ${appt.horario}
        <a href="schedule.html?id=${appt.id}">Ver detalhes</a>
      </div>
    `).join('');
    }
}

fetchAppointments();

window.logout = async () => {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
};
