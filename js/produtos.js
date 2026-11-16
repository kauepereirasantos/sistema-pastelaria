
const gradeProdutos = document.getElementById("grade-produtos");
const botaoAdicionar = document.getElementById("adicionar");
const campoBusca = document.getElementById("busca");

const dialogo = document.getElementById("dialogo-produto");
const formulario = document.getElementById("form-produto");

const campoId = document.getElementById("id-produto");
const campoNome = document.getElementById("nome-produto");
const campoPreco = document.getElementById("preco-produto");
const campoImagem = document.getElementById("imagem-produto");

const botaoFechar = document.getElementById("fechar");
const botaoCancelar = document.getElementById("cancelar");

// Abre o formulário para cadastrar um produto
botaoAdicionar.addEventListener("click", () => {
    formulario.reset();
    campoId.value = "";
    dialogo.showModal();
});

// Fecha o formulário
botaoFechar.addEventListener("click", () => {
    dialogo.close();
});

botaoCancelar.addEventListener("click", () => {
    dialogo.close();
});

// Transforma a imagem selecionada em um formato que pode ser salvo
function lerImagem(arquivo) {
    return new Promise((resolve, reject) => {
        if (!arquivo) {
            resolve("");
            return;
        }

        if (!arquivo.type.startsWith("image/")) {
            reject(new Error("Selecione um arquivo de imagem válido."));
            return;
        }

        const leitor = new FileReader();

        leitor.onload = () => resolve(leitor.result);
        leitor.onerror = () => reject(new Error("Não foi possível ler a imagem."));

        leitor.readAsDataURL(arquivo);
    });
}

// Mostra os produtos na tela
function mostrarProdutos(lista = obterProdutos()) {
    gradeProdutos.innerHTML = "";

    if (lista.length === 0) {
        gradeProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    lista.forEach((produto) => {
        const card = document.createElement("div");
        card.classList.add("produto-card");

        // Imagem do produto
        if (produto.imagem) {
            const imagem = document.createElement("img");
            imagem.src = produto.imagem;
            imagem.alt = produto.nome;
            imagem.classList.add("imagem-produto");

            card.appendChild(imagem);
        }

        // Nome do produto
        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        // Preço do produto
        const preco = document.createElement("p");
        preco.textContent = moeda(Number(produto.preco));

        // Área dos botões
        const acoes = document.createElement("div");
        acoes.classList.add("produto-acoes");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.type = "button";
        botaoEditar.addEventListener("click", () => editarProduto(produto.id));

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.type = "button";
        botaoExcluir.addEventListener("click", () => excluirProduto(produto.id));

        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoExcluir);

        card.appendChild(nome);
        card.appendChild(preco);
        card.appendChild(acoes);

        gradeProdutos.appendChild(card);
    });
}

// Salva um novo produto ou atualiza um existente
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const preco = Number(campoPreco.value);

    if (!nome || !Number.isFinite(preco) || preco <= 0) {
        alert("Preencha o nome e informe um preço válido.");
        return;
    }

    const produtos = obterProdutos();
    const id = campoId.value;

    const produtoExistente = id
        ? produtos.find((produto) => String(produto.id) === id)
        : null;

    try {
        const arquivo = campoImagem.files[0];
        const novaImagem = await lerImagem(arquivo);

        const produto = {
            id: produtoExistente ? produtoExistente.id : Date.now(),
            nome: nome,
            preco: preco,
            imagem: novaImagem || (produtoExistente?.imagem || "")
        };

        if (produtoExistente) {
            const indice = produtos.findIndex(
                (item) => String(item.id) === id
            );

            produtos[indice] = produto;
        } else {
            produtos.push(produto);
        }

        gravarProdutos(produtos);
        mostrarProdutos();

        formulario.reset();
        dialogo.close();

        alert(produtoExistente
            ? "Produto atualizado com sucesso!"
            : "Produto cadastrado com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
});

// Preenche o formulário para editar um produto
function editarProduto(id) {
    const produtos = obterProdutos();

    const produto = produtos.find(
        (item) => String(item.id) === String(id)
    );

    if (!produto) return;

    campoId.value = produto.id;
    campoNome.value = produto.nome;
    campoPreco.value = produto.preco;

    // A imagem antiga será mantida se nenhuma nova for selecionada
    campoImagem.value = "";

    dialogo.showModal();
}

// Exclui um produto
function excluirProduto(id) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (!confirmar) return;

    const produtos = obterProdutos();

    const produtosAtualizados = produtos.filter(
        (produto) => String(produto.id) !== String(id)
    );

    gravarProdutos(produtosAtualizados);
    mostrarProdutos();

    alert("Produto excluído com sucesso!");
}

// Pesquisa produtos pelo nome
campoBusca.addEventListener("input", () => {
    const pesquisa = campoBusca.value.toLowerCase().trim();

    const produtos = obterProdutos();

    const resultado = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(pesquisa)
    );

    mostrarProdutos(resultado);
});

// Carrega os produtos ao abrir a página
mostrarProdutos();

