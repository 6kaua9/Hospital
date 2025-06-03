document.addEventListener('DOMContentLoaded', function() {
    // Preencher select de pacientes
    const pacientes = JSON.parse(localStorage.getItem('cadastros')) || [];
    const selectPaciente = document.getElementById('paciente');
    pacientes.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.nome;
        opt.textContent = p.nome;
        selectPaciente.appendChild(opt);
    });

    // Preencher select de alas
    const alas = JSON.parse(localStorage.getItem('Alas')) || [];
    const selectAla = document.getElementById('ala');
    alas.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.nomeAla;
        opt.textContent = a.nomeAla;
        selectAla.appendChild(opt);
    });

    // Preencher select de médicas plantonistas (profissionais com função médica)
    const profissionais = JSON.parse(localStorage.getItem('Profissionais')) || [];
    const selectMedica = document.getElementById('medica');
    profissionais.filter(p => p.funçao && p.funçao.toLowerCase().includes('med')).forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.matricula || m.nome;
        opt.textContent = m.nome + (m.matricula ? ` (${m.matricula})` : '');
        selectMedica.appendChild(opt);
    });
});

let internacoes = JSON.parse(localStorage.getItem('Internacoes')) || [];

function registrarInternacao() {
    const paciente = document.getElementById('paciente').value;
    const ala = document.getElementById('ala').value;
    const estadoSaude = document.getElementById('estadoSaude').value;
    const medicamentos = document.getElementById('medicamentos').value;
    const exames = document.getElementById('exames').value;
    const medica = document.getElementById('medica').value;
    const enfermeira = document.getElementById('enfermeira').value;
    let dataHora = document.getElementById('dataHora').value;
    if (!dataHora) {
        const now = new Date();
        dataHora = now.toISOString().slice(0,16);
    }

    // Busca o documento do paciente selecionado
    const pacientes = JSON.parse(localStorage.getItem('cadastros')) || [];
    const pacienteObj = pacientes.find(p => p.nome === paciente);
    const documento = pacienteObj ? pacienteObj.documento : '';

    if (!paciente || !ala || !estadoSaude || !medicamentos || !exames || !medica || !enfermeira) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    if (!medicamentos.trim()) {
        alert('Informe pelo menos um medicamento!');
        return;
    }
    if (!exames.toLowerCase().includes('hemograma')) {
        alert('O exame hemograma é obrigatório!');
        return;
    }
    internacoes.push({ paciente, documento, ala, estadoSaude, medicamentos, exames, medica, enfermeira, dataHora });
    localStorage.setItem('Internacoes', JSON.stringify(internacoes));  
    alert("Internação cadastrado com sucesso!");
    renderizar();
}

function renderizar() {
    const lista = document.getElementById('listaInternacoes');
    if (!lista) return;
    lista.innerHTML = '';
    const ul = document.createElement('ul');
    internacoes.forEach((i) => {
        const li = document.createElement('li');
        li.textContent = `${i.paciente} | ${i.ala} | ${i.estadoSaude} | ${i.medicamentos} | ${i.exames} | ${i.medica} | ${i.enfermeira} | ${i.dataHora}`;
        ul.appendChild(li);
    });
    lista.appendChild(ul);
}

window.onload = renderizar;
