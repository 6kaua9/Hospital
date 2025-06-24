const internacoes = JSON.parse(localStorage.getItem("Internacoes")) || [];
const pacientes = JSON.parse(localStorage.getItem("Pacientes")) || [];
const alas = JSON.parse(localStorage.getItem("Alas")) || [];

// Considera apenas internações ativas
const internacoesAtuais = internacoes.filter(internacao => (internacao.status || 'ativa') === 'ativa');

const alasComPacientes = alas.map(ala => {
  const pacientesNaAla = internacoesAtuais
    .filter(internacao => internacao.alaId === ala.id)
    .map(internacao => {
      const paciente = pacientes.find(p => p.id === internacao.pacienteId);
      return {
        nome: paciente ? paciente.nome : '-',
        idade: paciente ? paciente.idade : '-',
        sexo: paciente ? paciente.sexo : '-',
        dataEntrada: new Date(internacao.dataHora).toLocaleString()
      };
    });

  return {
    nomeAla: ala.nomeAla || ala.nome,
    pacientes: pacientesNaAla
  };
});

const container = document.getElementById("relatorioAla");

alasComPacientes.forEach(ala => {
  const alaDiv = document.createElement("div");
  alaDiv.innerHTML = `<h2>${ala.nomeAla}</h2>`;

  if (ala.pacientes.length === 0) {
    alaDiv.innerHTML += `<p>Nenhum paciente internado atualmente.</p>`;
  } else {
    const tabela = document.createElement("table");
    tabela.innerHTML = `
      <tr>
        <th>Nome</th>
        <th>Idade</th>
        <th>Sexo</th>
        <th>Data de Entrada</th>
      </tr>
    `;

    ala.pacientes.forEach(p => {
      tabela.innerHTML += `
        <tr>
          <td>${p.nome}</td>
          <td>${p.idade}</td>
          <td>${p.sexo}</td>
          <td>${p.dataEntrada}</td>
        </tr>
      `;
    });

    alaDiv.appendChild(tabela);
  }

  container.appendChild(alaDiv);
});
