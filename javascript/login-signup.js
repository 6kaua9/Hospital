document.addEventListener('DOMContentLoaded', function() {
    // Login
    const formLogin = document.querySelector('form');
    if (formLogin) {
        formLogin.onsubmit = function(e) {
            e.preventDefault();
            const cpf = formLogin.querySelector('input[type="text"]').value.trim();
            const diaNascimento = formLogin.querySelector('input[type="password"]').value.trim();
            if (loginProfissional(cpf, diaNascimento)) {
                window.location.href = '../html/TelaInicial.html';
            }
        };
    }
});

function loginProfissional(cpf, diaNascimento) {
    let profissionais = JSON.parse(localStorage.getItem('Profissionais')) || [];
    // Considerando que 'documento' é o CPF e 'idade' é o dia do nascimento (ou ajuste para 'dataNascimento' se preferir)
    let profissional = profissionais.find(p => 
        (p.documento === cpf) && 
        (String(p.idade) === diaNascimento) // ou p.dataNascimento === diaNascimento
    );
    if (profissional) {
        localStorage.setItem('usuarioLogado', JSON.stringify({
            documento: profissional.documento,
            nome: profissional.nome,
            cargo: profissional.cargo || '',
            matricula: profissional.matricula || '',
            funcao: profissional.funçao || profissional.funcao || ''
        }));
        return true;
    } else {
        alert('CPF ou dia de nascimento inválidos');
        return false;
    }


document.addEventListener('DOMContentLoaded', function() {
    // Cria o admin padrão se não existir
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (!usuarios.some(u => u.matricula === 'admin')) {
        usuarios.push({
            nome: 'Administrador',
            matricula: 'admin',
            nivelAcesso: 'admin',
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


}
