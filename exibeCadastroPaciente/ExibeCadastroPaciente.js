(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        // Apenas admin, medico, enfermeira_chefe, recepcao podem acessar
        const niveisPermitidos = ['admin', '1', '2', '3', '4', '5'];
        if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = '../outros/TelaInicial.html';
        }
        window.nivelAcesso = usuarioLogado ? usuarioLogado.nivelAcesso : null;
    });
})();

let cadastroPaciente = JSON.parse(localStorage.getItem("Pacientes"))
        function renderizar() {
            const ul = document.getElementById("listaCadastros");
            ul.innerHTML = "";
            cadastroPaciente.forEach((item, index) => {
                const li = document.createElement("li");

                // Cria um link clicável para cada item
                const link = document.createElement("a");
                link.href = `#`; // Pode ser alterado para redirecionar para outra página
                link.textContent = `${item.nome} | ${item.documento} | ${item.idade} anos`;
                link.onclick = () => exibirDetalhes(index); // Adiciona um evento de clique

                li.appendChild(link);
                ul.appendChild(li);
            });
        }

        function exibirDetalhes(index) {
            pacienteAtualIndex = index;
            const paciente = cadastroPaciente[index];
            let rua = '', numeroRua = '', bairro = '', cidade = '', estado = '';
            if (paciente.endereco) {
                rua = paciente.endereco.rua || '';
                numeroRua = paciente.endereco.numeroRua || '';
                bairro = paciente.endereco.bairro || '';
                cidade = paciente.endereco.cidade || '';
                estado = paciente.endereco.estado || '';
            }
            const detalhes = `
                <strong>Nome:</strong> <span>${paciente.nome}</span><br>
                <strong>Documento:</strong> <span>${paciente.documento}</span><br>
                <strong>Idade:</strong> <span>${paciente.idade}</span><br>
                <strong>Sexo:</strong> <span>${paciente.sexo || '-'}</span><br>
                <strong>Rua:</strong> <span>${rua}</span><br>
                <strong>Nº Rua:</strong> <span>${numeroRua}</span><br>
                <strong>Bairro:</strong> <span>${bairro}</span><br>
                <strong>Cidade:</strong> <span>${cidade}</span><br>
                <strong>Estado:</strong> <span>${estado}</span><br>
                <strong>Plano:</strong> <span>${paciente.plano}</span><br>
                <strong>Histórico:</strong> <span id="historico">${paciente.historico}</span><br>
                <strong>Queixa:</strong> <span id="queixa">${paciente.queixa}</span>
            `;
            document.getElementById("detalhesPaciente").innerHTML = detalhes;
            document.getElementById("Lista").style.display = "none";
            document.getElementById("paciente").style.display = "block";
        }

        function editarDetalhes() {
            const paciente = cadastroPaciente[pacienteAtualIndex];
            let rua = '', numeroRua = '', bairro = '', cidade = '', estado = '';
            if (paciente.endereco) {
                rua = paciente.endereco.rua || '';
                numeroRua = paciente.endereco.numeroRua || '';
                bairro = paciente.endereco.bairro || '';
                cidade = paciente.endereco.cidade || '';
                estado = paciente.endereco.estado || '';
            }
            const detalhes = `
                <strong>Nome:</strong> <input id="editNome" value="${paciente.nome}"><br>
                <strong>Documento:</strong> <input id="editDocumento" value="${paciente.documento}"><br>
                <strong>Idade:</strong> <input id="editIdade" type="number" value="${paciente.idade}"><br>
                <strong>Sexo:</strong> <select id="editSexo">
                    <option value="Feminino" ${paciente.sexo === 'Feminino' ? 'selected' : ''}>Feminino</option>
                    <option value="Masculino" ${paciente.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
                    <option value="Outro" ${paciente.sexo === 'Outro' ? 'selected' : ''}>Outro</option>
                </select><br>
                <strong>Rua:</strong> <input id="editRua" value="${rua}"><br>
                <strong>Nº Rua:</strong> <input id="editNumeroRua" value="${numeroRua}"><br>
                <strong>Bairro:</strong> <input id="editBairro" value="${bairro}"><br>
                <strong>Cidade:</strong> <input id="editCidade" value="${cidade}"><br>
                <strong>Estado:</strong> <input id="editEstado" value="${estado}"><br>
                <strong>Plano:</strong> <select id="editPlano">
                    <option value="SUS" ${paciente.plano === "SUS" ? "selected" : ""}>SUS</option>
                    <option value="planoDeSaude" ${paciente.plano === "planoDeSaude" ? "selected" : ""}>Plano de saude</option></select><br>
                <strong>Histórico:</strong> <textarea id="editHistorico">${paciente.historico}</textarea><br>
                <strong>Queixa:</strong> <textarea id="editQueixa">${paciente.queixa}</textarea><br>
                <button onclick="salvarEdicao()">Salvar</button>
            `;
            document.getElementById("detalhesPaciente").innerHTML = detalhes;
        }

        function salvarEdicao() {
            cadastroPaciente[pacienteAtualIndex] = {
                nome: document.getElementById("editNome").value,
                documento: document.getElementById("editDocumento").value,
                idade: document.getElementById("editIdade").value,
                sexo: document.getElementById("editSexo").value,
                endereco: {
                    rua: document.getElementById("editRua").value,
                    numeroRua: document.getElementById("editNumeroRua").value,
                    bairro: document.getElementById("editBairro").value,
                    cidade: document.getElementById("editCidade").value,
                    estado: document.getElementById("editEstado").value
                },
                plano: document.getElementById("editPlano").value,
                historico: document.getElementById("editHistorico").value,
                queixa: document.getElementById("editQueixa").value,
            };
            localStorage.setItem("cadastros", JSON.stringify(cadastroPaciente));
            exibirDetalhes(pacienteAtualIndex);
        }

        function voltar() {
            // Mostra a seção "Lista" e esconde a seção "paciente"
            document.getElementById("Lista").style.display = "block";
            document.getElementById("paciente").style.display = "none";
        }

        function excluir() {
            if (pacienteAtualIndex !== null && pacienteAtualIndex >= 0) {
                // Remove o paciente do array
                cadastroPaciente.splice(pacienteAtualIndex, 1);
                // Atualiza o localStorage
                localStorage.setItem("Pacientes", JSON.stringify(cadastroPaciente));
                // Volta para a lista e atualiza a tela
                voltar();
                renderizar();
            }
        }
        window.onload = renderizar;