document.addEventListener('DOMContentLoaded', function() {
    // Garante que exista um admin cadastrado em Profissionais
    let profissionais = JSON.parse(localStorage.getItem('Profissionais')) || [];
    if (!profissionais.some(p => p.documento === '00000000000')) {
        profissionais.push({
            nome: 'Administrador',
            documento: '00000000000', // CPF fictício para admin
            idade: '01', // Dia de nascimento fictício
            cargo: 'admin',           // <-- cargo como admin
            nivelAcesso: 'admin',     // <-- nivelAcesso como admin
            matricula: 'admin',
            funçao: 'admin'
        });
        localStorage.setItem('Profissionais', JSON.stringify(profissionais));
    }
    // Login usando CPF e dia de nascimento
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
    let profissional = profissionais.find(p => 
        (p.documento === cpf) && 
        (String(p.idade) === diaNascimento)
    );
    if (profissional) {
        localStorage.setItem('usuarioLogado', JSON.stringify({
            documento: profissional.documento,
            nome: profissional.nome,
            cargo: profissional.cargo || '',
            matricula: profissional.matricula || '',
            funcao: profissional.funçao || profissional.funcao || '',
            nivelAcesso: profissional.nivelAcesso || ''
        }));
        return true;
    } else {
        alert('CPF ou dia de nascimento inválidos');
        return false;
    }
}
