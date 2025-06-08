document.addEventListener("DOMContentLoaded", function () {
  const profissionais = JSON.parse(localStorage.getItem("Profissionais")) || [];
  const select = document.getElementById("profissionalSelect");

  profissionais.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id || p.matricula || p.nome;
    opt.textContent = `${p.nome} (${p.funçao || p.cargo || 'Função não definida'})`;
    select.appendChild(opt);
  });
});

function gerarRelatorioPorProfissional() {
  const profissionalIdSelecionado = document.getElementById("profissionalSelect").value;

  const internacoes = JSON.parse(localStorage.getItem("Internacoes")) || [];
  const pacientes = JSON.parse(localStorage.getItem("cadastros")) || [];
  const profissionais = JSON.parse(localStorage.getItem("Profissionais")) || [];

  const profissionalSelecionado = profissionais.find(p => (p.id || p.matricula || p.nome) == profissionalIdSelecionado);
  if (!profissionalSelecionado) {
    alert("Profissional não encontrado.");
    return;
  }

  const relatorio = internacoes.filter(i => i.medica === profissionalIdSelecionado);

  const container = document.getElementById("relatorioProfissional");
  container.innerHTML = "";

  if (relatorio.length === 0) {
    container.innerHTML = "<p>Nenhuma internação registrada para este profissional.</p>";
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

    tabela.innerHTML += `
      <tr>
        <td>${nomePaciente}</td>
        <td>${new Date(i.dataHora).toLocaleString()}</td>
        <td>${i.ala || '-'}</td>
        <td>${i.estadoSaude || '-'}</td>
        <td>${i.status || 'ativa'}</td>
      </tr>
    `;
  });

  container.appendChild(tabela);
}
