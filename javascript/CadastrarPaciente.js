
document.getElementById("idade").addEventListener("change", function(){
        const idade = this.value;
        const responsavel = document.getElementsByClassName("responsavel")[0];

        if(idade < 18){
            responsavel.style.display="block";
        } else{
            responsavel.style.display="none";
        }

    })
    document.getElementById("planos").addEventListener("change", function(){
        const planos = this.value;
        const planoSaude = document.getElementsByClassName("planoSaude")[0];

        if(planos === "planoDeSaude"){
        planoSaude.style.display="block";
        } else{
            planoSaude.style.display="none";
        }
    })
let cadastroPaciente = JSON.parse(localStorage.getItem("cadastros")) || [];

function salvar(){
    const nome = document.getElementById("nome").value;
    const documento = document.getElementById("documento").value;
    const idade = document.getElementById("idade").value;
    const responsavel = document.getElementById("nomeResponsavel") ? document.getElementById("nomeResponsavel").value : "";
    // Novos campos de endereço
    const rua = document.getElementById("rua").value;
    const numeroRua = document.getElementById("numeroRua").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const plano= document.getElementById("planos").value;
    const nomePlano = document.getElementById("nomePlano").value;
    const numeroPlano = document.getElementById("numeroPlano").value;
    const historico= document.getElementById("historico").value;
    const queixa= document.getElementById("queixa").value;

    if (nome && documento && idade) {
        cadastroPaciente.push({
            nome,
            documento,
            idade,
            responsavel,
            endereco: {
                rua,
                numeroRua,
                bairro,
                cidade,
                estado
            },
            plano,
            nomePlano,
            numeroPlano,
            historico,
            queixa
        });
        localStorage.setItem("cadastros", JSON.stringify(cadastroPaciente));
    }
    alert("paciente cadastrado com sucesso!");
    renderizar();
}

function renderizar() {
    const ul = document.getElementById("listaCadastros");
    if (!ul) return;
    ul.innerHTML = "";
    cadastroPaciente.forEach((item) => {
        const li = document.createElement("li");
        // Exibe endereço formatado se existir
        let enderecoStr = "";
        if (item.endereco) {
            enderecoStr = `${item.endereco.rua || ''}, Nº ${item.endereco.numeroRua || ''}, ${item.endereco.bairro || ''}, ${item.endereco.cidade || ''} - ${item.endereco.estado || ''}`;
        }
        li.textContent = `${item.nome} | ${item.documento} | ${item.idade} anos | ${enderecoStr}`;
        ul.appendChild(li);
    });
}

    window.onload = renderizar;