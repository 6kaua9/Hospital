document.addEventListener("DOMContentLoaded", function () {
  const internacoes = JSON.parse(localStorage.getItem("Internacoes")) || [];
  const pacientes = JSON.parse(localStorage.getItem("cadastros")) || [];
  const alas = JSON.parse(localStorage.getItem("Alas")) || [];

  const ativas = internacoes.filter(i => i.status === 'ativa');
  const finalizadas = internacoes.filter(i => i.status === 'finalizada');

  function criarTabelaInternacoes(lista) {
    const tabela = document.createElement("table");
    tabela.border = "1";
    tabela.style.marginBottom = "20px";

    tabela.innerHTML = `
      <tr>
        <th>Paciente</th>
        <th>Ala</th>
        <th>Data Entrada</th>
        <th>Data Alta</th>
        <th>Estado de Saúde</th>
      </tr>
    `;

    lista.forEach(i => {
      const paciente = pacientes.find(p => p.id === i.pacienteId);
      const ala = alas.find(a => a.id === i.alaId);

      tabela.innerHTML += `
        <tr>
          <td>${paciente ? paciente.nome : 'Desconhecido'}</td>
          <td>${ala ? ala.nomeAla : i.ala || '-'}</td>
          <td>${new Date(i.dataHora).toLocaleString()}</td>
          <td>${i.dataAlta ? new Date(i.dataAlta).toLocaleString() : '-'}</td>
          <td>${i.estadoSaude || '-'}</td>
        </tr>
      `;
    });

    return tabela;
  }

  const divAtivas = document.getElementById("internacoesAtivas");
  const divFinalizadas = document.getElementById("internacoesFinalizadas");

  if (ativas.length > 0) {
    divAtivas.appendChild(criarTabelaInternacoes(ativas));
  } else {
    divAtivas.innerHTML = "<p>Nenhuma internação ativa no momento.</p>";
  }

  if (finalizadas.length > 0) {
    divFinalizadas.appendChild(criarTabelaInternacoes(finalizadas));
  } else {
    divFinalizadas.innerHTML = "<p>Nenhuma internação finalizada registrada.</p>";
  }
});
