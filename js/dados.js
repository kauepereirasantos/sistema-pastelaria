
// ========================================
// DADOS COMPARTILHADOS DO SISTEMA
// ========================================

// Nome utilizado para guardar os produtos.
const CHAVE_PRODUTOS = "pastelaria_produtos";

// Produtos iniciais do sistema.
const produtosIniciais = [

    {
        id: "1",
        nome: "Pastel de carne",
        preco: 10.00
    },

    {
        id: "2",
        nome: "Pastel de queijo",
        preco: 10.00
    },

    {
        id: "3",
        nome: "Pastel de frango",
        preco: 12.00
    },

    {
        id: "4",
        nome: "Refrigerante lata",
        preco: 6.00
    }

];

// ========================================
// BUSCAR PRODUTOS
// ========================================

function obterProdutos() {

    const dados = localStorage.getItem(CHAVE_PRODUTOS);

    // Se ainda não houver produtos salvos,
    // cadastra os produtos iniciais.
    if (dados === null) {

        gravarProdutos(produtosIniciais);

        return produtosIniciais.map(produto => ({ ...produto }));

    }

    try {

        const produtos = JSON.parse(dados);

        return Array.isArray(produtos) ? produtos : [];

    } catch (erro) {

        console.error("Erro ao carregar produtos:", erro);

        return [];

    }

}

// ========================================
// SALVAR PRODUTOS
// ========================================

function gravarProdutos(produtos) {

    localStorage.setItem(
        CHAVE_PRODUTOS,
        JSON.stringify(produtos)
    );

}

// ========================================
// FORMATAR PREÇO
// ========================================

function moeda(valor) {

    return Number(valor).toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}
