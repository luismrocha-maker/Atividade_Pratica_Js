
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let codigo = document.getElementById("codigo").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let preco = Number(document.getElementById("preco").value);

    let mensagem = document.getElementById("mensagem");

    if (nome == "" || codigo == "" ||
        document.getElementById("quantidade").value == "" ||
        document.getElementById("preco").value == "") {

        mensagem.innerHTML = "Preencha todos os campos";
        return;
    }

    if (quantidade < 0 || quantidade % 1 != 0 || preco < 0) {
        mensagem.innerHTML = "Digite valores válidos";
        return;
    }

    let repetido = produtos.find(produto => produto.codigo == codigo);

    if (repetido) {
        mensagem.innerHTML = "Esse código já existe";
        return;
    }

    produtos.push({
        nome: nome,
        codigo: codigo,
        quantidade: quantidade,
        preco: preco
    });

    salvar();
    mostrarProdutos();

    mensagem.innerHTML = "Produto cadastrado!";

    document.getElementById("nome").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";
}

function entrada(codigo) {
    let quantidade = Number(prompt("Quantas unidades deseja adicionar?"));

    if (quantidade <= 0 || quantidade % 1 != 0) {
        alert("Digite uma quantidade válida");
        return;
    }

    let produto = produtos.find(item => item.codigo == codigo);

    produto.quantidade += quantidade;

    salvar();
    mostrarProdutos();
}

function saida(codigo) {
    let quantidade = Number(prompt("Quantas unidades deseja retirar?"));

    let produto = produtos.find(item => item.codigo == codigo);

    if (quantidade <= 0 || quantidade % 1 != 0) {
        alert("Digite uma quantidade válida");
        return;
    }

    if (quantidade > produto.quantidade) {
        alert("Não existe essa quantidade no estoque");
        return;
    }

    produto.quantidade -= quantidade;

    salvar();
    mostrarProdutos();
}

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function mostrarProdutos() {
    let lista = document.getElementById("lista");
    let total = 0;

    lista.innerHTML = "";

    produtos.forEach(produto => {
        let valor = produto.quantidade * produto.preco;
        total += valor;

        let classe = "";

        if (produto.quantidade < 5) {
            classe = "baixo";
        }

        lista.innerHTML += `
            <div class="produto ${classe}">
                Nome: ${produto.nome}<br>
                Código: ${produto.codigo}<br>
                Quantidade: ${produto.quantidade}<br>
                Preço: R$ ${produto.preco.toFixed(2)}<br>
                Valor em estoque: R$ ${valor.toFixed(2)}<br>

                <button onclick="entrada('${produto.codigo}')">Entrada</button>
                <button onclick="saida('${produto.codigo}')">Saída</button>
            </div>
        `;
    });

    document.getElementById("total").innerHTML =
        "Valor total do estoque: R$ " + total.toFixed(2);
}

mostrarProdutos();
