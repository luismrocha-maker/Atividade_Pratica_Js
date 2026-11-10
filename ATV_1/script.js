
function calcular() {
    let nome = document.getElementById("nome").value;
    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);
    let nota3 = Number(document.getElementById("nota3").value);

    let resultado = document.getElementById("resultado");

    if (nome == "" || document.getElementById("nota1").value == "" ||
        document.getElementById("nota2").value == "" ||
        document.getElementById("nota3").value == "") {

        resultado.innerHTML = "Preencha todos os campos";
        return;
    }

    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 ||
        nota3 < 0 || nota3 > 10) {

        resultado.innerHTML = "Digite notas entre 0 e 10";
        return;
    }

    let media = (nota1 + nota2 + nota3) / 3;

    if (media >= 7) {
        resultado.innerHTML = nome + "<br>Média: " + media.toFixed(1) + "<br>Aprovado!";
    } 
    else if (media >= 5) {
        resultado.innerHTML = nome + "<br>Média: " + media.toFixed(1) + "<br>Recuperação!";
    } 
    else {
        resultado.innerHTML = nome + "<br>Média: " + media.toFixed(1) + "<br>Reprovado!";
    }
}
