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

            window.fecharPopupPacientes = function() {
                document.getElementById('popupPacientes').style.display = 'none';
            };
            window.fecharPopupProfissionais = function() {
                document.getElementById('popupProfissionais').style.display = 'none';
            };

            window.onclick = function(event) {
                const popupPac = document.getElementById('popupPacientes');
                const popupProf = document.getElementById('popupProfissionais');
                if (event.target === popupPac) {
                    popupPac.style.display = 'none';
                }
                if (event.target === popupProf) {
                    popupProf.style.display = 'none';
                }
            };
        });
});