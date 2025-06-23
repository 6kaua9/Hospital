document.addEventListener('DOMContentLoaded', function() {
    // Cadastro de usuário
    const formCadastro = document.getElementById('formCadastroUsuario');
    if (formCadastro) {
        formCadastro.onsubmit = function(e) {
            e.preventDefault();
            const dados = {
                nome: document.getElementById('nome').value.trim(),
                matricula: document.getElementById('documento').value.trim(),
                cargo: document.getElementById('cargo').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                email: document.getElementById('email').value.trim(),
                senha: document.getElementById('senha').value,
                nivelAcesso: document.getElementById('nivelAcesso') ? document.getElementById('nivelAcesso').value : document.getElementById('nivel').value
            };
            if (cadastrarUsuario(dados)) {
                formCadastro.reset();
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1200);
            }
        };
    }
    // Login
    const formLogin = document.querySelector('form');
    if (formLogin && formLogin.id !== 'formCadastroUsuario') {
        formLogin.onsubmit = function(e) {
            e.preventDefault();
            const usuario = formLogin.querySelector('input[type="text"]').value.trim();
            const senha = formLogin.querySelector('input[type="password"]').value;
            if (login(usuario, senha)) {
                window.location.href = '../html/TelaInicial.html';
            }
        };
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Cria o admin padrão se não existir 
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (!usuarios.some(u => u.email === 'admin')) {
        usuarios.push({
            nome: 'Administrador',
            matricula: 'admin',
            nivelAcesso: 'admin',
            funcao: 'admin',
            cargo: 'Administrador',
            telefone: '',
            email: 'admin',
            senha: 'admin123',
            validado: true // admin já é validado
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
});

function cadastrarUsuario(dados) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(u => u.matricula === dados.matricula)) {
        alert('Matrícula já cadastrada!');
        return false;
    }
    // Usuários comuns não são validados automaticamente
    dados.validado = false;
    usuarios.push(dados);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado! Aguarde validação do administrador.');
    return true;
}

function validarUsuario(documento) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let user = usuarios.find(u => u.documento === documento);
    if (user) {
        user.validado = true;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuário validado!');
    }
}

function login(emailUser, senha) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let user = usuarios.find(u => u.email === emailUser && u.senha === senha);
    if (user) {
        if (!user.validado) {
            alert('Usuário ainda não validado pelo administrador.');
            return false;
        }
        localStorage.setItem('usuarioLogado', JSON.stringify({
            nome: user.nome,
            cargo: user.cargo,
            nivelAcesso: user.nivelAcesso || '',
            funcao: user.funcao || ''
        }));
        return true;
    } else {
        alert('Usuário ou senha inválidos');
        return false;
    }
}

//pop up descrição niveis usuarios
        document.addEventListener('DOMContentLoaded', function() {
            const btnInfo = document.getElementById('btnInfoNivel');
            const popup = document.getElementById('popupNivelInfo');
            if(btnInfo && popup) {
                btnInfo.addEventListener('click', function(e) {
                    e.stopPropagation();
                    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
                });
                document.addEventListener('click', function(e) {
                    if (popup.style.display === 'block' && !popup.contains(e.target) && e.target !== btnInfo) {
                        popup.style.display = 'none';
                    }
                });
            }
            // Preencher select de profissionais cadastrados // A consertar
            const selectProf = document.getElementById('profissionalAssociado');
            if (selectProf) {
                let profissionais = [];
                try {
                    profissionais = JSON.parse(localStorage.getItem('Profissionais')) || [];
                } catch (e) { profissionais = []; }
                // Corrige para aceitar diferentes formatos de objeto profissional
                profissionais.forEach(function(prof) {
                    let nome = prof.nome || prof.Nome || prof.nomeCompleto || '';
                    let cargo = prof.cargo || prof.Cargo || '';
                    let id = prof.id || prof.matricula || prof.Matricula || nome;
                    if (nome) {
                        const opt = document.createElement('option');
                        opt.value = id;
                        opt.textContent = nome + (cargo ? ' - ' + cargo : '');
                        selectProf.appendChild(opt);
                    }
                });
            }
});