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
            if(funçao === 'medico' || funçao === 'enfermeiro') {
                if(!matricula) {
                    alert('Matrícula é obrigatória para médicos e enfermeiros!');
                    return;
                }
            }
            if(nome && documento && idade && rua && numeroRua && bairro && cidade && estado && telefone && funçao && (funçao === 'medico' || funçao === 'enfermeiro' ? matricula : true) && cargo){
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
                    matricula: (funçao === 'medico' || funçao === 'enfermeiro') ? matricula : 'Sem Matricula',
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

    // Restrições de acesso por nível de usuário
    (function() {
        document.addEventListener('DOMContentLoaded', function() {
            const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
            // Apenas admin, medico, enfermeira_chefe podem acessar
            const niveisPermitidos = ['admin', 'medico', 'enfermeira_chefe'];
            if (!usuarioLogado || !niveisPermitidos.includes(usuarioLogado.nivelAcesso)) {
                alert('Você não tem permissão para acessar esta página.');
                window.location.href = 'TelaInicial.html';
            }
        });
    })();

    document.addEventListener('DOMContentLoaded', function() {
        const selectFuncao = document.getElementById('funçao');
        const campoMatricula = document.getElementById('matricula').parentElement;
        function atualizarCampoMatricula() {
            const valor = selectFuncao.value;
            if (valor === 'medico' || valor === 'enfermeiro') {
                campoMatricula.style.display = '';
            } else {
                campoMatricula.style.display = 'none';
                document.getElementById('matricula').value = '';
            }
        }
        if (selectFuncao && campoMatricula) {
            atualizarCampoMatricula();
            selectFuncao.addEventListener('change', atualizarCampoMatricula);
        }
    });

//pop up descrição niveis usuarios
document.addEventListener('DOMContentLoaded', function() {
            const btnInfo = document.getElementById('btnInfoNivel');
            const popup = document.getElementById('popupNivelInfo');
            if(btnInfo && popup) {
                btnInfo.addEventListener('click', function(e) {
                    e.stopPropagation();
                    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
                });
                document.addEventListener('click', function(e) {
                    if (popup.style.display === 'block' && !popup.contains(e.target) && e.target !== btnInfo) {
                        popup.style.display = 'none';
                    }
                });
            }
});