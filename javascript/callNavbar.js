document.addEventListener("DOMContentLoaded", function() {
    fetch('../html/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            const popups = ['Pacientes', 'Profissionais', 'Alas', 'Internacoes', 'Relatorios'];

            popups.forEach(popup => {
                const btn = document.getElementById(`btn${popup}`);
                const modal = document.getElementById(`popup${popup}`);

                if (btn && modal) {
                    btn.onclick = () => modal.style.display = 'block';

                    // Função para fechar o popup via escopo global (se necessário)
                    window[`fecharPopup${popup}`] = () => modal.style.display = 'none';
                }
            });

            window.onclick = function (event) {
                popups.forEach(popup => {
                    const modal = document.getElementById(`popup${popup}`);
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            }

            // Logoff popup logic
            const userIcon = document.getElementById('userIcon');
            const popupLogoff = document.getElementById('popupLogoff');
            if (userIcon && popupLogoff) {
                userIcon.onclick = function(e) {
                    e.stopPropagation(); //mantém o click restrito ao popup de logoff
                    popupLogoff.style.display = 'block';
                };
                // Impede que clique dentro do popup feche ele
                popupLogoff.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
                // Fecha ao clicar fora
                document.addEventListener('click', function(e) {
                    if (popupLogoff.style.display === 'block' && !popupLogoff.contains(e.target) && e.target.id !== 'userIcon') {
                        popupLogoff.style.display = 'none';
                    }
                });
                // Botão sair
                window.logoffUsuario = function() {
                    localStorage.removeItem('usuarioLogado');
                    window.location.href = 'login.html';
                };
                // Botão fechar
                window.fecharPopupLogoff = function() {
                    popupLogoff.style.display = 'none';
                };
            }

            // Atualiza nome do usuário logado no ícone
            try {
                const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
                if (usuarioLogado && usuarioLogado.nome) {
                    userIcon.innerHTML = `👤 ${usuarioLogado.nome}`;
                } else {
                    userIcon.innerHTML = '👤 Usuário';
                }
            } catch (e) {
                userIcon.innerHTML = '👤 Usuário';
            }

         // Controle de acesso por nível de usuário ainda nao esta funcionando, consertar
            function aplicarPermissoesNavbar(nivel) {
                // Exemplo de bloqueio de botões/popups
                // Admin: tudo liberado
                if (nivel === 'admin') return;
                // Médico: tudo exceto gerenciar usuários
                if (nivel === 'medico') {
                    // Exemplo: esconder botão de validação de usuários
                    const btnConfig = document.querySelector('button:contains("Configurações")');
                    if (btnConfig) btnConfig.style.display = 'none';
                }
                // Enfermeira Chefe: gerencia alas e equipe
                if (nivel === 'enfermeira_chefe') {
                    // Esconde pacientes e internações
                    const btnPac = document.getElementById('btnPacientes');
                    const btnInt = document.getElementById('btnInternacoes');
                    if (btnPac) btnPac.style.display = 'none';
                    if (btnInt) btnInt.style.display = 'none';
                }
                // Enfermeira: só pacientes
                if (nivel === 'enfermeira') {
                    const btnProf = document.getElementById('btnProfissionais');
                    const btnAlas = document.getElementById('btnAlas');
                    const btnInt = document.getElementById('btnInternacoes');
                    if (btnProf) btnProf.style.display = 'none';
                    if (btnAlas) btnAlas.style.display = 'none';
                    if (btnInt) btnInt.style.display = 'none';
                }
                // Recepcionista: só cadastros e consultas
                if (nivel === 'recepcao') {
                    const btnInt = document.getElementById('btnInternacoes');
                    if (btnInt) btnInt.style.display = 'none';
                }
                // Usuário comum: só visualização
                if (nivel === 'usuario') {
                    const btnProf = document.getElementById('btnProfissionais');
                    const btnPac = document.getElementById('btnPacientes');
                    const btnAlas = document.getElementById('btnAlas');
                    const btnInt = document.getElementById('btnInternacoes');
                    const btnRel = Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('Relatórios'));
                    const btnConfig = Array.from(document.querySelectorAll('button')).find(b=>b.textContent.includes('Configurações'));
                    if (btnProf) btnProf.style.display = 'none';
                    if (btnPac) btnPac.style.display = 'none';
                    if (btnAlas) btnAlas.style.display = 'none';
                    if (btnInt) btnInt.style.display = 'none';
                    if (btnRel) btnRel.style.display = 'none';
                    if (btnConfig) btnConfig.style.display = 'none';
                }
            }
            // Detecta nível do usuário logado
            let nivelAcesso = null;
            try {
                const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
                nivelAcesso = usuarioLogado && usuarioLogado.nivelAcesso ? usuarioLogado.nivelAcesso : null;
            } catch (e) {}
            if (nivelAcesso) aplicarPermissoesNavbar(nivelAcesso);

        });
});