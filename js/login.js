
// ========================================
// PÁGINA DE LOGIN
// ----------------------------------------
// ATENÇÃO - SOMENTE PARA DEMONSTRAÇÃO ACADÊMICA:
// o usuário e a senha abaixo ficam escritos em
// texto puro neste arquivo JavaScript, que qualquer
// pessoa pode abrir no navegador (F12 / "exibir
// código-fonte"). Por isso esta verificação NÃO
// oferece segurança real e não protege o sistema.
// Uma autenticação de verdade exigiria um servidor.
// ========================================

const USUARIO_DEMO = "Marli";
const SENHA_DEMO = "123";

// Página principal do sistema (mesma pasta de login.html)
const PAGINA_PRINCIPAL = "inicio.html";

const formLogin = document.getElementById("form-login");
const campoUsuario = document.getElementById("usuario");
const campoSenha = document.getElementById("senha");
const erroUsuario = document.getElementById("erro-usuario");
const erroSenha = document.getElementById("erro-senha");
const mensagemGeral = document.getElementById("mensagem-geral");
const botaoMostrarSenha = document.getElementById("mostrar-senha");

// ========================================
// VALIDAÇÃO DOS CAMPOS (preenchimento)
// ========================================

// Retorna a mensagem de erro ou "" se estiver válido
function validarUsuario(valor) {

    if (valor === "") {
        return "Informe seu usuário.";
    }

    return "";
}

function validarSenha(valor) {

    if (valor === "") {
        return "Informe sua senha.";
    }

    return "";
}

// ========================================
// EXIBIÇÃO DAS MENSAGENS
// ========================================

function mostrarErro(campo, elementoErro, mensagem) {

    elementoErro.textContent = mensagem;

    if (mensagem) {
        campo.classList.add("invalido");
        campo.setAttribute("aria-invalid", "true");
    } else {
        campo.classList.remove("invalido");
        campo.removeAttribute("aria-invalid");
    }
}

// Marca o campo como inválido sem texto próprio
// (usado quando a mensagem geral explica o problema)
function marcarInvalido(campo) {

    campo.classList.add("invalido");
    campo.setAttribute("aria-invalid", "true");
}

function mostrarMensagemGeral(tipo, texto) {

    mensagemGeral.textContent = texto;
    mensagemGeral.className = "mensagem-geral " + tipo;
    mensagemGeral.setAttribute("role", "alert");
    mensagemGeral.hidden = false;
}

function esconderMensagemGeral() {

    mensagemGeral.hidden = true;
    mensagemGeral.textContent = "";
}

// ========================================
// ENVIO DO FORMULÁRIO
// ========================================

formLogin.addEventListener("submit", function(evento) {

    // Impede o envio/recarregamento da página
    evento.preventDefault();

    esconderMensagemGeral();

    const usuario = campoUsuario.value.trim();
    const senha = campoSenha.value;

    // 1) Campos vazios
    const mensagemUsuario = validarUsuario(usuario);
    const mensagemSenha = validarSenha(senha);

    mostrarErro(campoUsuario, erroUsuario, mensagemUsuario);
    mostrarErro(campoSenha, erroSenha, mensagemSenha);

    if (mensagemUsuario || mensagemSenha) {

        // Foco no primeiro campo com problema
        (mensagemUsuario ? campoUsuario : campoSenha).focus();

        mostrarMensagemGeral("erro", "Preencha os campos destacados para continuar.");
        return;
    }

    // 2) Confere as credenciais de demonstração
    // (usuário sem diferenciar maiúsculas/minúsculas; senha exata)
    const usuarioCorreto = usuario.toLowerCase() === USUARIO_DEMO.toLowerCase();
    const senhaCorreta = senha === SENHA_DEMO;

    if (usuarioCorreto && senhaCorreta) {

        // 3) Credenciais corretas: vai para a página principal
        window.location.href = PAGINA_PRINCIPAL;
        return;
    }

    // 4) Credenciais incorretas: mantém o que foi digitado
    marcarInvalido(campoUsuario);
    marcarInvalido(campoSenha);

    mostrarMensagemGeral("erro", "Usuário ou senha incorretos.");

    campoSenha.focus();

});

// ========================================
// LIMPA O ERRO AO DIGITAR
// ========================================

campoUsuario.addEventListener("input", function() {
    mostrarErro(campoUsuario, erroUsuario, "");
    esconderMensagemGeral();
});

campoSenha.addEventListener("input", function() {
    mostrarErro(campoSenha, erroSenha, "");
    esconderMensagemGeral();
});

// ========================================
// MOSTRAR / OCULTAR SENHA
// ========================================

botaoMostrarSenha.addEventListener("click", function() {

    const estaOculta = campoSenha.type === "password";

    campoSenha.type = estaOculta ? "text" : "password";
    botaoMostrarSenha.textContent = estaOculta ? "Ocultar" : "Mostrar";
    botaoMostrarSenha.setAttribute("aria-pressed", String(estaOculta));

});
