import { supabase } from '/src/scripts/supabaseClient.js';

// Simulação: pegue o ID do agendamento via query string
const params = new URLSearchParams(window.location.search);
const appointmentId = params.get('id');

async function loadAppointment() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return (window.location.href = 'login.html');

    const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', appointmentId)
        .single();

    const container = document.getElementById('appointment-details');
    if (error) {
        container.innerHTML = `<p>Erro ao carregar: ${error.message}</p>`;
    } else {
        container.innerHTML = `
          <p><strong>Cliente:</strong> ${data.cliente}</p>
          <p><strong>Horário:</strong> ${data.horario}</p>
          <p><strong>Serviço:</strong> ${data.servico}</p>
          <p><strong>Local:</strong> ${data.local}</p>
          <p><strong>Status:</strong> ${data.status}</p>
        `;
    }
}

loadAppointment();