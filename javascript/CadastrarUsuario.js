// Este script deve ser incluído na tela de cadastro de usuário
// Exemplo de uso: <script src="../javascript/cadastroUsuario.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    // Cria o admin padrão se não existir
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (!usuarios.some(u => u.matricula === 'admin')) {
        usuarios.push({
            nome: 'Administrador',
            matricula: 'admin',
            funcao: 'admin',
            cargo: 'Administrador',
            telefone: '',
            endereco: '',
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

function validarUsuario(matricula) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let user = usuarios.find(u => u.matricula === matricula);
    if (user) {
        user.validado = true;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuário validado!');
    }
}

function login(matricula, senha) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let user = usuarios.find(u => u.matricula === matricula && u.senha === senha);
    if (user) {
        if (!user.validado) {
            alert('Usuário ainda não validado pelo administrador.');
            return false;
        }
        localStorage.setItem('usuarioLogado', JSON.stringify({
            matricula: user.matricula,
            nome: user.nome,
            cargo: user.cargo,
            funcao: user.funcao
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
                    profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
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