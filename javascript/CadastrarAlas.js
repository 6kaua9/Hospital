let cadastroAlas = JSON.parse(localStorage.getItem("Alas")) || [];

function salvarAla() {
    const nomeAla = document.getElementById("nomeAla").value;
    const especialidade = document.getElementById("especialidade").value;
    const sexo = document.getElementById("sexo").value;
    const capacidade = document.getElementById("capacidade").value;

    if (nomeAla && especialidade && sexo) {
        cadastroAlas.push({ nomeAla, especialidade, sexo, capacidade });
        localStorage.setItem("Alas", JSON.stringify(cadastroAlas));
    }
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
