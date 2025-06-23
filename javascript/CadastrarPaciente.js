(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        
        const niveisPermitidos = ['admin', '1', '5'];
        if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = 'TelaInicial.html';
        }
        window.nivelAcesso = usuarioLogado ? usuarioLogado.nivelAcesso : null;
    });
})();


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
let cadastroPaciente = JSON.parse(localStorage.getItem("Pacientes")) || [];

function salvar(){
    const nome = document.getElementById("nome").value;
    const documento = document.getElementById("documento").value;
    const idade = document.getElementById("idade").value;
    const sexo = document.getElementById("sexo").value;
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
    const id = Date.now();

    if (nome && documento && idade && sexo) {
        cadastroPaciente.push({
            id,
            nome,
            documento,
            idade,
            sexo,
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
        localStorage.setItem("Pacientes", JSON.stringify(cadastroPaciente));
    }
    alert("paciente cadastrado com sucesso!");
    document.getElementById("registroPaciente").reset();   
}

    window.onload = renderizar;