(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        // Apenas admin pode criar novos profissionais;
        const niveisPermitidos = ['admin', '1'];
        if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
            alert('Apenas usuáros Administradores podem acessar esta página.');
            window.location.href = 'TelaInicial.html';
        }
        window.nivelAcesso = usuarioLogado ? usuarioLogado.nivelAcesso : null;
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('usuariosPendentes');
    let usuarios = [];
    try {
        usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch (e) { usuarios = []; }
    const pendentes = usuarios.filter(u => !u.validado && u.matricula !== 'admin');

    if (pendentes.length === 0) {
        lista.innerHTML = '<p style="text-align:center;color:#2563eb;">Nenhum usuário pendente de validação.</p>';
        return;
    }

    pendentes.forEach(function(u, idx) {
        const card = document.createElement('div');
        card.className = 'usuario-card';
        card.innerHTML = `
            <div class="usuario-info">
                <b>Nome:</b> ${u.nome}<br>
                <b>Matrícula:</b> ${u.matricula}<br>
                <b>Cargo:</b> ${u.cargo || '-'}<br>
                <b>Nível de acesso:</b> ${u.nivelAcesso || '-'}<br>
                <b>Telefone:</b> ${u.telefone || '-'}<br>
                <b>Endereço:</b> ${u.endereco || '-'}<br>
            </div>
            <div class="usuario-actions">
                <button class="btn-validar">Validar</button>
                <button class="btn-rejeitar">Rejeitar</button>
            </div>
        `;
        // Validar
        card.querySelector('.btn-validar').onclick = function() {
            u.validado = true;
            usuarios = usuarios.map(us => us.matricula === u.matricula ? u : us);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            card.remove();
            if (!document.querySelector('.usuario-card')) {
                lista.innerHTML = '<p style="text-align:center;color:#2563eb;">Nenhum usuário pendente de validação.</p>';
            }
        };
        // Rejeitar
        card.querySelector('.btn-rejeitar').onclick = function() {
            usuarios = usuarios.filter(us => us.matricula !== u.matricula);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            card.remove();
            if (!document.querySelector('.usuario-card')) {
                lista.innerHTML = '<p style="text-align:center;color:#2563eb;">Nenhum usuário pendente de validação.</p>';
            }
        };
        lista.appendChild(card);
    });
});
