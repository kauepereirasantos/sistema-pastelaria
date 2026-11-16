
// ========================================
// AÇÃO DO BOTÃO SAIR
// ========================================

const botaoSair = document.getElementById("sair");

if (botaoSair) {

    botaoSair.addEventListener("click", function() {

        const confirmar = confirm(
            "Deseja realmente sair do sistema?"
        );

        if (confirmar) {

            window.location.href = "login.html";

        }

    });

}
