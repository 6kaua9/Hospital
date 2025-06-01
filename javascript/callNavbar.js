document.addEventListener("DOMContentLoaded", function() {
    fetch('../html/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            document.getElementById('btnPacientes').onclick = function() {
                document.getElementById('popupPacientes').style.display = 'block';
            };
            document.getElementById('btnProfissionais').onclick = function() {
                document.getElementById('popupProfissionais').style.display = 'block';
            };
            document.getElementById('btnAlas').onclick = function() {
                document.getElementById('popupAlas').style.display = 'block';
            };
            document.getElementById('btnInternacoes').onclick = function() {
                document.getElementById('popupInternacoes').style.display = 'block';
            };

            window.fecharPopupPacientes = function() {
                document.getElementById('popupPacientes').style.display = 'none';
            };
            window.fecharPopupProfissionais = function() {
                document.getElementById('popupProfissionais').style.display = 'none';
            };
            window.fecharPopupAlas = function() {
                document.getElementById('popupAlas').style.display = 'none';
            };
            window.fecharPopupInternacoes = function() {
                document.getElementById('popupInternacoes').style.display = 'none';
            };

            window.onclick = function(event) {
                const popupPac = document.getElementById('popupPacientes');
                const popupProf = document.getElementById('popupProfissionais');
                const popupAlas = document.getElementById('popupAlas');
                const popupInt = document.getElementById('popupInternacoes');
                if (event.target === popupPac) {
                    popupPac.style.display = 'none';
                }
                if (event.target === popupProf) {
                    popupProf.style.display = 'none';
                }
                if (event.target === popupAlas) {
                    popupAlas.style.display = 'none';
                }
                if (event.target === popupInt) {
                    popupInt.style.display = 'none';
                }
            };

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

            // Popup Configurações (acesso controlado)
            const btnConfig = document.getElementById('btnConfiguracoes');
            const popupConfig = document.getElementById('popupConfiguracoes');
            if (btnConfig && popupConfig) {
                btnConfig.onclick = function(e) {
                    e.stopPropagation();
                    let usuarioLogado = null;
                    try {
                        usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
                    } catch (e) {}
                    if (usuarioLogado && usuarioLogado.nivelAcesso === 'admin') {
                        popupConfig.style.display = 'block';
                    } else {
                        alert('Apenas administradores podem acessar esta página.');
                    }
                };
                popupConfig.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
                document.addEventListener('click', function(e) {
                    if (popupConfig.style.display === 'block' && !popupConfig.contains(e.target) && e.target !== btnConfig) {
                        popupConfig.style.display = 'none';
                    }
                });
                window.fecharPopupConfiguracoes = function() {
                    popupConfig.style.display = 'none';
                };
            }
            // O botão fica sempre visível, popup só abre para admin
            if (nivelAcesso !== 'admin' && btnConfig) {
                btnConfig.style.display = 'none';
            }
            if (nivelAcesso !== 'admin' && popupConfig) {
                popupConfig.style.display = 'none';
            }
        });
});