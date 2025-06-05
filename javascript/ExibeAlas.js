(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        // Apenas admin...
        const niveisPermitidos = ['admin', '1', '2', '3', '4', '5'];
        if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = 'TelaInicial.html';
        }
        window.nivelAcesso = usuarioLogado ? usuarioLogado.nivelAcesso : null;
    });
})();

let cadastroAlas = JSON.parse(localStorage.getItem("Alas")) || [];
let alaAtualIndex = null;

function renderizar() {
    const ul = document.getElementById("listaAlas");
    ul.innerHTML = "";
    cadastroAlas.forEach((item, index) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = `${item.nomeAla} | ${item.especialidade} | ${item.sexo}`;
        link.onclick = () => exibirDetalhes(index);
        li.appendChild(link);
        ul.appendChild(li);
    });
}

function exibirDetalhes(index) {
    alaAtualIndex = index;
    const ala = cadastroAlas[index];
    const detalhes = `
        <strong>Nome da Ala:</strong> <span>${ala.nomeAla}</span><br>
        <strong>Especialidade:</strong> <span>${ala.especialidade}</span><br>
        <strong>Sexo Atendido:</strong> <span>${ala.sexo}</span><br>
        <strong>Capacidade:</strong> <span>${ala.capacidade || '---'}</span>
    `;
    document.getElementById("detalhesAla").innerHTML = detalhes;
    document.getElementById("Lista").style.display = "none";
    document.getElementById("ala").style.display = "block";
}

function editarDetalhes() {
    const ala = cadastroAlas[alaAtualIndex];
    const detalhes = `
        <strong>Nome da Ala:</strong> <input id="editNomeAla" value="${ala.nomeAla}"><br>
        <strong>Especialidade:</strong> <input id="editEspecialidade" value="${ala.especialidade}"><br>
        <strong>Sexo Atendido:</strong> <select id="editSexo">
            <option value="Feminino" ${ala.sexo === 'Feminino' ? 'selected' : ''}>Feminino</option>
            <option value="Masculino" ${ala.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
        </select><br>
        <strong>Capacidade:</strong> <input id="editCapacidade" type="number" value="${ala.capacidade || ''}"><br>
        <button onclick="salvarEdicao()">Salvar</button>
    `;
    document.getElementById("detalhesAla").innerHTML = detalhes;
}

function salvarEdicao() {
    cadastroAlas[alaAtualIndex] = {
        nomeAla: document.getElementById("editNomeAla").value,
        especialidade: document.getElementById("editEspecialidade").value,
        sexo: document.getElementById("editSexo").value,
        capacidade: document.getElementById("editCapacidade").value
    };
    localStorage.setItem("Alas", JSON.stringify(cadastroAlas));
    exibirDetalhes(alaAtualIndex);
}

function voltar() {
    document.getElementById("Lista").style.display = "block";
    document.getElementById("ala").style.display = "none";
}

function excluir() {
    if (alaAtualIndex !== null && alaAtualIndex >= 0) {
        // Remove o paciente do array
        cadastroAlas.splice(alaAtualIndex, 1);
        // Atualiza o localStorage
        localStorage.setItem("Alas", JSON.stringify(cadastroAlas));
        // Volta para a lista e atualiza a tela
        voltar();
        renderizar();
    }
}

window.onload = renderizar;
