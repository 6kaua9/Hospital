document.addEventListener("DOMContentLoaded", function() {
    fetch('../html/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            document.getElementById('btnPacientes').onclick = function() {
                document.getElementById('popupPacientes').style.display = 'block';
            };
            document.getElementById('btnProfissionais').onclick = function() {
                document.getElementById('popupProfissionais').style.display = 'block';
            };
            document.getElementById('btnAlas').onclick = function() {
                document.getElementById('popupAlas').style.display = 'block';
            };
            document.getElementById('btnInternacoes').onclick = function() {
                document.getElementById('popupInternacoes').style.display = 'block';
            };

            window.fecharPopupPacientes = function() {
                document.getElementById('popupPacientes').style.display = 'none';
            };
            window.fecharPopupProfissionais = function() {
                document.getElementById('popupProfissionais').style.display = 'none';
            };
            window.fecharPopupAlas = function() {
                document.getElementById('popupAlas').style.display = 'none';
            };
            window.fecharPopupInternacoes = function() {
                document.getElementById('popupInternacoes').style.display = 'none';
            };

            window.onclick = function(event) {
                const popupPac = document.getElementById('popupPacientes');
                const popupProf = document.getElementById('popupProfissionais');
                const popupAlas = document.getElementById('popupAlas');
                const popupInt = document.getElementById('popupInternacoes');
                if (event.target === popupPac) {
                    popupPac.style.display = 'none';
                }
                if (event.target === popupProf) {
                    popupProf.style.display = 'none';
                }
                if (event.target === popupAlas) {
                    popupAlas.style.display = 'none';
                }
                if (event.target === popupInt) {
                    popupInt.style.display = 'none';
                }
            };
        });
});