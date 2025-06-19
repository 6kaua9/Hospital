let cadastroAlas = JSON.parse(localStorage.getItem("Alas")) || [];

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        // Apenas admin, medico, enfermeira_chefe, recepcao podem acessar
        const niveisPermitidos = ['admin', '1', '3'];
        if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = 'TelaInicial.html';
        }
        window.nivelAcesso = usuarioLogado ? usuarioLogado.nivelAcesso : null;
    });
})();

function salvarAla() {
    const nomeAla = document.getElementById("nomeAla").value;
    const especialidade = document.getElementById("especialidade").value;
    const sexo = document.getElementById("sexo").value;
    const capacidade = document.getElementById("capacidade").value;
    const id = Date.now();
    if (nomeAla && especialidade && sexo) {
        cadastroAlas.push({ id, nomeAla, especialidade, sexo, capacidade });
        localStorage.setItem("Alas", JSON.stringify(cadastroAlas));
    }
    alert("Nova ala cadastrado com sucesso!");
    document.getElementById("formAla").reset();
    renderizar();
}

function renderizar() {
    const lista = document.getElementById("listaAlas");
    if (!lista) return;
    lista.innerHTML = "";
    const ul = document.createElement("ul");
    cadastroAlas.forEach((ala) => {
        const li = document.createElement("li");
        li.textContent = `${ala.nomeAla} | ${ala.especialidade} | ${ala.sexo} | Capacidade: ${ala.capacidade || '---'}`;
        ul.appendChild(li);
    });
    lista.appendChild(ul);
}

window.onload = renderizar;
