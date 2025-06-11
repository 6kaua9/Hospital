function gerarRelatorioPorPeriodo() {
  const dataInicio = new Date(document.getElementById('dataInicio').value);
  const dataFim = new Date(document.getElementById('dataFim').value);

  if (!dataInicio || !dataFim || isNaN(dataInicio) || isNaN(dataFim)) {
    alert("Por favor, selecione um intervalo de datas válido.");
    return;
  }

  const internacoes = JSON.parse(localStorage.getItem("Internacoes")) || [];
  const pacientes = JSON.parse(localStorage.getItem("cadastros")) || [];

  const relatorio = internacoes.filter(i => {
    const dataInternacao = new Date(i.dataHora);
    return dataInternacao >= dataInicio && dataInternacao <= dataFim;
  });

  const container = document.getElementById("relatorioPeriodo");
  container.innerHTML = "";

  if (relatorio.length === 0) {
    container.innerHTML = "<p>Nenhuma internação no período selecionado.</p>";
    return;
  }

  const tabela = document.createElement("table");
  tabela.border = "1";
  tabela.innerHTML = `
    <tr>
      <th>Paciente</th>
      <th>Data de Internação</th>
      <th>Ala</th>
      <th>Estado de Saúde</th>
      <th>Status</th>
    </tr>
  `;

  relatorio.forEach(i => {
    const paciente = pacientes.find(p => p.id === i.pacienteId);
    const nomePaciente = paciente ? paciente.nome : "Desconhecido";

    const dataInternacao = new Date(i.dataHora).toLocaleString();
    const status = i.status || 'ativa';

    const linha = `
      <tr>
        <td>${nomePaciente}</td>
        <td>${dataInternacao}</td>
        <td>${i.alaNome || '-'}</td>
        <td>${i.estadoSaude || '-'}</td>
        <td>${status}</td>
      </tr>
    `;

    tabela.innerHTML += linha;
  });

  container.appendChild(tabela);
}
