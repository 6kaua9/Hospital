document.addEventListener("DOMContentLoaded", function() {
    fetch('../html/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });
});

let cadastroProfissional = JSON.parse(localStorage.getItem("Profissionais")) || [];
        function salvar(){
            const nome = document.getElementById("nome").value;
            const documento = document.getElementById("documento").value;
            const idade = document.getElementById("idade").value;
            // Novos campos de endereço
            const rua = document.getElementById("rua").value;
            const numeroRua = document.getElementById("numeroRua").value;
            const bairro = document.getElementById("bairro").value;
            const cidade = document.getElementById("cidade").value;
            const estado = document.getElementById("estado").value;
            const telefone= document.getElementById("Telefone").value;
            const funçao = document.getElementById("funçao").value;
            const matricula= document.getElementById("matricula").value;
            const cargo = document.getElementById("cargo").value;
            if(nome && documento && idade && rua && numeroRua && bairro && cidade && estado && telefone && funçao && matricula && cargo){
                cadastroProfissional.push({
                    nome,
                    documento,
                    idade,
                    endereco: {
                        rua,
                        numeroRua,
                        bairro,
                        cidade,
                        estado
                    },
                    telefone,
                    funçao,
                    matricula,
                    cargo
                });
                localStorage.setItem("Profissionais", JSON.stringify(cadastroProfissional));
            }
        }

    function renderizar() {
        const ul = document.getElementById("listaProfissionais");
        if (!ul) return;
        ul.innerHTML = "";
        cadastroProfissional.forEach((item) => {
            let enderecoStr = "";
            if (item.endereco) {
                enderecoStr = `${item.endereco.rua || ''}, Nº ${item.endereco.numeroRua || ''}, ${item.endereco.bairro || ''}, ${item.endereco.cidade || ''} - ${item.endereco.estado || ''}`;
            }
            const li = document.createElement("li");
            li.textContent = `${item.nome} | ${enderecoStr} | ${item.telefone} | ${item.funçao} | ${item.cargo}`;
            ul.appendChild(li);
        });
    }

    window.onload = renderizar;