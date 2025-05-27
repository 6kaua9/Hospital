document.addEventListener("DOMContentLoaded", function() {
    fetch('../html/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });
});

let cadastroPaciente = JSON.parse(localStorage.getItem("cadastros"))
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
            // Monta o endereço formatado se existir
            let enderecoStr = "";
            if (paciente.endereco) {
                enderecoStr = `${paciente.endereco.rua || ''}, Nº ${paciente.endereco.numeroRua || ''}, ${paciente.endereco.bairro || ''}, ${paciente.endereco.cidade || ''} - ${paciente.endereco.estado || ''}`;
            }
            const detalhes = `
                <strong>Nome:</strong> <span id="nome">${paciente.nome}</span><br>
                <strong>Documento:</strong> <span id="documento">${paciente.documento}</span><br>
                <strong>Idade:</strong> <span id="idade">${paciente.idade}</span><br>
                <strong>Endereço:</strong> <span id="endereco">${enderecoStr}</span><br>
                <strong>Plano:</strong> <span id="plano">${paciente.plano}</span><br>
                <strong>Histórico:</strong> <span id="historico">${paciente.historico}</span><br>
                <strong>Queixa:</strong> <span id="queixa">${paciente.queixa}</span>
            `;
            document.getElementById("detalhesPaciente").innerHTML = detalhes;

            // Esconde a seção "Lista" e mostra a seção "paciente"
            document.getElementById("Lista").style.display = "none";
            document.getElementById("paciente").style.display = "block";
        }

        function editarDetalhes() {
            const paciente = cadastroPaciente[pacienteAtualIndex];
            // Preenche campos separados para endereço
            let rua = "", numeroRua = "", bairro = "", cidade = "", estado = "";
            if (paciente.endereco) {
                rua = paciente.endereco.rua || "";
                numeroRua = paciente.endereco.numeroRua || "";
                bairro = paciente.endereco.bairro || "";
                cidade = paciente.endereco.cidade || "";
                estado = paciente.endereco.estado || "";
            }
            const detalhes = `
                <strong>Nome:</strong> <input id="editNome" value="${paciente.nome}"><br>
                <strong>Documento:</strong> <input id="editDocumento" value="${paciente.documento}"><br>
                <strong>Idade:</strong> <input id="editIdade" type="number" value="${paciente.idade}"><br>
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
            // Atualiza os dados do paciente com os valores editados
            cadastroPaciente[pacienteAtualIndex] = {
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
                plano: document.getElementById("editPlano").value,
                historico: document.getElementById("editHistorico").value,
                queixa: document.getElementById("editQueixa").value,
            };

            // Salva os dados atualizados no localStorage
            localStorage.setItem("cadastros", JSON.stringify(cadastroPaciente));

            // Reexibe os detalhes atualizados
            exibirDetalhes(pacienteAtualIndex);
        }

        function voltar() {
            // Mostra a seção "Lista" e esconde a seção "paciente"
            document.getElementById("Lista").style.display = "block";
            document.getElementById("paciente").style.display = "none";
        }

        window.onload = renderizar;