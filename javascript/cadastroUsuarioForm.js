document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formCadastroUsuario');
    form.onsubmit = function(e) {
        e.preventDefault();
        const dados = {
            nome: document.getElementById('nome').value.trim(),
            matricula: document.getElementById('matricula').value.trim(),
            cargo: document.getElementById('cargo').value.trim(),
            profissionalAssociado: document.getElementById('profissionalAssociado').value || null,
            telefone: document.getElementById('telefone').value.trim(),
            endereco: document.getElementById('endereco').value.trim(),
            senha: document.getElementById('senha').value,
            nivelAcesso: document.getElementById('nivelAcesso') ? document.getElementById('nivelAcesso').value : document.getElementById('nivel').value
        };
        if (cadastrarUsuario(dados)) {
            form.reset();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1200);
        }
    };
});
