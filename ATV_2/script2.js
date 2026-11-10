
function gerarTabuada() {
    let numero = Number(document.getElementById("numero").value);
    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    if (document.getElementById("numero").value == "" ||
    //preferi usar is.intinger ao inves de Mathfloor, ahcei mais pratico.
        numero < 1 || numero > 20 || !Number.isInteger(numero)) {

        resultado.innerHTML = "Digite um número inteiro de 1 até 20";
        return;
    }

    for (let i = 1; i <= 10; i++) {
        resultado.innerHTML += numero + " x " + i + " = " + (numero * i) + "<br>";
    }
}

function limpar() {
    document.getElementById("numero").value = "";
    document.getElementById("resultado").innerHTML = "";
}
