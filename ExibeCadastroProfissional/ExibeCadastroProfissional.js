(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        // Apenas admin, medico, enfermeira_chefe, recepcao podem acessar
        const niveisPermitidos = ['admin', '1', '5'];
        if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = '../outros/TelaInicial.html';
        }
        window.nivelAcesso = usuarioLogado ? usuarioLogado.nivelAcesso : null;
    });
})();

let cadastroProfissional = JSON.parse(localStorage.getItem("Profissionais")) || [];
let profissionalAtualIndex = null;

function renderizar() {
    const ul = document.getElementById("listaProfissionais");
    ul.innerHTML = "";
    cadastroProfissional
        .filter(item => item.documento !== "00000000000") // Não exibe o admin
        .forEach((item) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = `${item.nome} | ${item.documento} | ${item.funçao}`;
            link.onclick = () => exibirDetalhes(cadastroProfissional.findIndex(p => p.documento === item.documento));
            li.appendChild(link);
            ul.appendChild(li);
    });
}

function exibirDetalhes(index) {
    profissionalAtualIndex = index;
    const profissional = cadastroProfissional[index];
    let enderecoStr = "";
    if (profissional.endereco) {
        enderecoStr = `${profissional.endereco.rua || ''}, Nº ${profissional.endereco.numeroRua || ''}, ${profissional.endereco.bairro || ''}, ${profissional.endereco.cidade || ''} - ${profissional.endereco.estado || ''}`;
    }
    const detalhes = `
        <strong>Nome:</strong> <span>${profissional.nome}</span><br>
        <strong>Documento:</strong> <span>${profissional.documento}</span><br>
        <strong>Data de nascimento:</strong> <span>${profissional.idade}</span><br>
        <strong>Endereço:</strong> <span>${enderecoStr}</span><br>
        <strong>Telefone:</strong> <span>${profissional.telefone}</span><br>
        <strong>Função:</strong> <span>${profissional.funçao}</span><br>
        <strong>Matrícula:</strong> <span>${profissional.matricula}</span><br>
        <strong>Cargo:</strong> <span>${profissional.cargo}</span>
    `;
    document.getElementById("detalhesProfissional").innerHTML = detalhes;
    document.getElementById("Lista").style.display = "none";
    document.getElementById("profissional").style.display = "block";
}

function editarDetalhes() {
    const profissional = cadastroProfissional[profissionalAtualIndex];
    let rua = "", numeroRua = "", bairro = "", cidade = "", estado = "";
    if (profissional.endereco) {
        rua = profissional.endereco.rua || "";
        numeroRua = profissional.endereco.numeroRua || "";
        bairro = profissional.endereco.bairro || "";
        cidade = profissional.endereco.cidade || "";
        estado = profissional.endereco.estado || "";
    }
    const detalhes = `
        <strong>Nome:</strong> <input id="editNome" value="${profissional.nome}"><br>
        <strong>Documento:</strong> <input id="editDocumento" value="${profissional.documento}"><br>
        <strong>Data de nascimento:</strong> <input id="editIdade" type="number" value="${profissional.idade}"><br>
        <strong>Rua:</strong> <input id="editRua" value="${rua}"><br>
        <strong>Nº Rua:</strong> <input id="editNumeroRua" value="${numeroRua}"><br>
        <strong>Bairro:</strong> <input id="editBairro" value="${bairro}"><br>
        <strong>Cidade:</strong> <input id="editCidade" value="${cidade}"><br>
        <strong>Estado:</strong> <input id="editEstado" value="${estado}"><br>
        <strong>Telefone:</strong> <input id="editTelefone" value="${profissional.telefone}"><br>
        <strong>Função:</strong> <input id="editFuncao" value="${profissional.funçao}"><br>
        <strong>Matrícula:</strong> <input id="editMatricula" value="${profissional.matricula}"><br>
        <strong>Cargo:</strong> <input id="editCargo" value="${profissional.cargo}"><br>
        <button onclick="salvarEdicao()">Salvar</button>
    `;
    document.getElementById("detalhesProfissional").innerHTML = detalhes;
}

function salvarEdicao() {
    cadastroProfissional[profissionalAtualIndex] = {
        nome: document.getElementById("editNome").value,
        documento: document.getElementById("editDocumento").value,
        idade: document.getElementById("editIdade").value,
        endereco: {
            rua: document.getElementById("editRua").value,
            numeroRua: document.getElementById("editNumeroRua").value,
            bairro: document.getElementById("editBairro").value,
            cidade: document.getElementById("editCidade").value,
            estado: document.getElementById("editEstado").value
        },
        telefone: document.getElementById("editTelefone").value,
        funçao: document.getElementById("editFuncao").value,
        matricula: document.getElementById("editMatricula").value,
        cargo: document.getElementById("editCargo").value
    };
    localStorage.setItem("Profissionais", JSON.stringify(cadastroProfissional));
    exibirDetalhes(profissionalAtualIndex);
}

function voltar() {
    document.getElementById("Lista").style.display = "block";
    document.getElementById("profissional").style.display = "none";
}

function excluir() {
    if (profissionalAtualIndex !== null && profissionalAtualIndex >= 0) {
        // Remove o paciente do array
        cadastroProfissional.splice(profissionalAtualIndex, 1);
        // Atualiza o localStorage
        localStorage.setItem("Profissionais", JSON.stringify(cadastroProfissional));
        // Volta para a lista e atualiza a tela
        voltar();
        renderizar();
    }
}

window.onload = renderizar;
