
function calcularDesconto() {
    let produto = document.getElementById("produto").value;
    let valor = Number(document.getElementById("valor").value);
    let quantidade = Number(document.getElementById("quantidade").value);
    let desconto = Number(document.getElementById("desconto").value);

    let resultado = document.getElementById("resultado");

    if (produto == "" || document.getElementById("valor").value == "" ||
        document.getElementById("quantidade").value == "" ||
        document.getElementById("desconto").value == "") {

        resultado.innerHTML = "Preencha todos os campos";
        return;
    }

    if (valor < 0 || quantidade <= 0 || quantidade % 1 != 0 ||
        desconto < 0 || desconto > 100) {

        resultado.innerHTML = "Digite valores válidos";
        return;
    }

    let subtotal = valor * quantidade;

    let economia = calcularValorDesconto(subtotal, desconto);

    let total = subtotal - economia;

    resultado.innerHTML =
        "Produto: " + produto +
        "<br>Subtotal: R$ " + subtotal.toFixed(2) +
        "<br>Economia: R$ " + economia.toFixed(2) +
        "<br>Total a pagar: R$ " + total.toFixed(2);
}

function calcularValorDesconto(valor, porcentagem) {
    return valor * porcentagem / 100;
}
