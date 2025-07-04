(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        // Apenas admin, medico, enfermeira_chefe, recepcao podem acessar
        const niveisPermitidos = ['admin', '1', '2', '3', '5'];
        if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = '../outros/TelaInicial.html';
        }
        window.nivelAcesso = usuarioLogado ? usuarioLogado.nivelAcesso : null;
    });
})();

let internacoes = JSON.parse(localStorage.getItem('Internacoes')) || [];
let internacaoAtualIndex = null;

function renderizar() {
    const ul = document.getElementById('listaInternacoes');
    ul.innerHTML = '';
    internacoes.forEach((item, index) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `${item.pacienteNome} | ${item.alaNome} | ${item.estadoSaude} | ${item.dataHora} | Status: ${item.status || 'ativa'}`;
        link.onclick = () => exibirDetalhes(index);
        li.appendChild(link);
        ul.appendChild(li);
    });
}

function exibirDetalhes(index) {
    internacaoAtualIndex = index;
    const i = internacoes[index];
    let detalhes = `
        <strong>Paciente:</strong> <span>${i.pacienteNome}</span><br>
        <strong>Documento:</strong> <span>${i.documento}</span><br>
        <strong>Ala:</strong> <span>${i.alaNome}</span><br>
        <strong>Estado de Saúde:</strong> <span>${i.estadoSaude}</span><br>
        <strong>Medicamentos:</strong> <span>${i.medicamentos}</span><br>
        <strong>Exames:</strong> <span>${i.exames}</span><br>
        <strong>Médica Plantonista:</strong> <span>${i.medicaNome}</span><br>
        <strong>Enfermeira Chefe:</strong> <span>${i.enfermeira}</span><br>
        <strong>Data/Hora de Início:</strong> <span>${i.dataHora}</span><br>
        <strong>Status:</strong> <span>${i.status || 'ativa'}</span><br>
        <strong>Data/Hora da Alta:</strong> <span>${i.dataAlta || '-'}</span><br>
        <button onclick="voltar()">Voltar</button> <button onclick="editarDetalhes()">Editar</button>`;
    if ((i.status || 'ativa') === 'ativa') {
        detalhes += ` <button onclick="abrirFormAlta(${index})">Dar Alta</button>`;
    }
    document.getElementById('detalhesInternacao').innerHTML = detalhes;
    document.getElementById('Lista').style.display = 'none';
    document.getElementById('internacao').style.display = 'block';
}

function editarDetalhes() {
    const i = internacoes[internacaoAtualIndex];
    const detalhes = `
        <strong>Paciente:</strong> <input id="editPaciente" value="${i.pacienteNome}"><br>
        <strong>Ala:</strong> <input id="editAla" value="${i.alaNome}"><br>
        <strong>Estado de Saúde:</strong> <input id="editEstadoSaude" value="${i.estadoSaude}"><br>
        <strong>Medicamentos:</strong> <input id="editMedicamentos" value="${i.medicamentos}"><br>
        <strong>Exames:</strong> <input id="editExames" value="${i.exames}"><br>
        <strong>Médica Plantonista:</strong> <input id="editMedica" value="${i.medicaNome}"><br>
        <strong>Enfermeira Chefe:</strong> <input id="editEnfermeira" value="${i.enfermeira}"><br>
        <strong>Data/Hora de Início:</strong> <input id="editDataHora" type="datetime-local" value="${i.dataHora}"><br>
        <button onclick="salvarEdicao()">Salvar</button>
    `;
    document.getElementById('detalhesInternacao').innerHTML = detalhes;
}

function salvarEdicao() {
    internacoes[internacaoAtualIndex] = {
        paciente: document.getElementById('editPaciente').value,
        ala: document.getElementById('editAla').value,
        estadoSaude: document.getElementById('editEstadoSaude').value,
        medicamentos: document.getElementById('editMedicamentos').value,
        exames: document.getElementById('editExames').value,
        medica: document.getElementById('editMedica').value,
        enfermeira: document.getElementById('editEnfermeira').value,
        dataHora: document.getElementById('editDataHora').value
    };
    localStorage.setItem('Internacoes', JSON.stringify(internacoes));
    exibirDetalhes(internacaoAtualIndex);
}

function abrirFormAlta(index) {
    const i = internacoes[index];
    // Data/hora padrão: agora
    const now = new Date();
    const padrao = now.toISOString().slice(0,16);
    const form = `
        <strong>Data/Hora da Alta:</strong> <input id="inputDataAlta" type="datetime-local" value="${padrao}"><br>
        <button onclick="confirmarAlta(${index})">Confirmar Alta</button>
        <button onclick="fecharFormAlta()">Cancelar</button>
    `;
    document.getElementById('detalhesInternacao').innerHTML = form;
    document.getElementById('Lista').style.display = 'none';
    document.getElementById('internacao').style.display = 'block';
}

function confirmarAlta(index) {
    const dataAltaInput = document.getElementById('inputDataAlta').value;
    let dataAltaFormatada = '';
    if (!dataAltaInput) {
        const now = new Date();
        dataAltaFormatada = now.toISOString().slice(0, 16);  
    } 
    internacoes[index].status = 'encerrada';
    internacoes[index].dataAlta = dataAltaInput;
    localStorage.setItem('Internacoes', JSON.stringify(internacoes));
    alert('Alta registrada com sucesso!');
    voltar();
    renderizar();
}

function fecharFormAlta() {
    voltar();
}

function voltar() {
    document.getElementById('Lista').style.display = 'block';
    document.getElementById('internacao').style.display = 'none';
}

window.onload = renderizar;
