(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const niveisPermitidos = ['admin', '1', '2'];
        if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = 'TelaInicial.html';
        }
        window.nivelAcesso = usuarioLogado ? usuarioLogado.nivelAcesso : null;
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const pacientes = JSON.parse(localStorage.getItem('cadastros')) || [];
    const selectPaciente = document.getElementById('paciente');
    pacientes.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id; // Valor agora é o ID
        opt.textContent = p.nome;
        selectPaciente.appendChild(opt);
    });

    const alas = JSON.parse(localStorage.getItem('Alas')) || [];
    const selectAla = document.getElementById('ala');
    alas.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.id; // Valor agora é o ID
        opt.textContent = a.nomeAla;
        selectAla.appendChild(opt);
    });

    const profissionais = JSON.parse(localStorage.getItem('Profissionais')) || [];
    const selectMedica = document.getElementById('medica');
    profissionais.filter(p => p.funçao && p.funçao.toLowerCase().includes('med')).forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id; // Valor agora é o ID
        opt.textContent = m.nome + (m.matricula ? ` (${m.matricula})` : '');
        selectMedica.appendChild(opt);
    });
});

let internacoes = JSON.parse(localStorage.getItem('Internacoes')) || [];

function registrarInternacao() {
    const pacienteId = document.getElementById('paciente').value;
    const alaId = document.getElementById('ala').value;
    const medicaId = document.getElementById('medica').value;
    const enfermeira = document.getElementById('enfermeira').value;
    const estadoSaude = document.getElementById('estadoSaude').value;
    const medicamentos = document.getElementById('medicamentos').value;
    const exames = document.getElementById('exames').value;
    let dataHora = document.getElementById('dataHora').value;

    if (!dataHora) {
        const now = new Date();
        dataHora = now.toISOString().slice(0, 16);
    }
    console.log(medicaId," e ", pacienteId, " e ", alaId);
    const pacientes = JSON.parse(localStorage.getItem('cadastros')) || [];
    const alas = JSON.parse(localStorage.getItem('Alas')) || [];
    const profissionais = JSON.parse(localStorage.getItem('Profissionais')) || [];

    const pacienteObj = pacientes.find(p => p.id == pacienteId);
    const alaObj = alas.find(a => a.id == alaId);
    const medicaObj = profissionais.find(p => p.id == medicaId);

    if (!pacienteObj || !alaObj || !medicaObj || !enfermeira || !estadoSaude || !medicamentos || !exames) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    if (!medicamentos.trim()) {
        alert('Informe pelo menos um medicamento!');
        return;
    }

    if (!exames.trim()) {
        alert('Pelo menos um hemograma é obrigatório!');
        return;
    }   

    const id = Date.now();
    internacoes.push({
        id,
        pacienteId: pacienteObj.id,
        pacienteNome: pacienteObj.nome,
        documento: pacienteObj.documento,
        alaId: alaObj.id,
        alaNome: alaObj.nomeAla,
        estadoSaude,
        medicamentos,
        exames,
        medicaId: medicaObj.id,
        medicaNome: medicaObj.nome,
        enfermeira,
        dataHora,
        dataAlta: null,
        status: 'ativa'
    });

    localStorage.setItem('Internacoes', JSON.stringify(internacoes));
    alert("Internação cadastrada com sucesso!");
    renderizar();
}

function renderizar() {
    const lista = document.getElementById('listaInternacoes');
    if (!lista) return;
    lista.innerHTML = '';
    const ul = document.createElement('ul');
    internacoes.forEach((i) => {
        const li = document.createElement('li');
        li.textContent = `${i.pacienteNome} | ${i.alaNome} | ${i.estadoSaude} | ${i.medicamentos} | ${i.exames} | ${i.medicaNome} | ${i.enfermeira} | ${i.dataHora}`;
        ul.appendChild(li);
    });
    lista.appendChild(ul);
}

window.onload = renderizar;
