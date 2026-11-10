
let alunos = JSON.parse(localStorage.getItem("alunos10")) || [];

function salvar() {
    localStorage.setItem("alunos10", JSON.stringify(alunos));
}

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let matricula = document.getElementById("matricula").value;
    let turma = document.getElementById("turma").value;

    if (nome == "" || matricula == "" || turma == "") {
        alert("Preencha todos os campos");
    } else {
        let existe = false;

        for (let i = 0; i < alunos.length; i++) {
            if (alunos[i].matricula == matricula) {
                existe = true;
            }
        }

        if (existe == true) {
            alert("Matrícula já cadastrada");
        } else {
            alunos.push({
                nome: nome,
                matricula: matricula,
                turma: turma,
                notas: [],
                faltas: 0
            });

            salvar();
            mostrar();
        }
    }
}

function mostrar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    for (let i = 0; i < alunos.length; i++) {
        let media = 0;

        for (let j = 0; j < alunos[i].notas.length; j++) {
            media = media + alunos[i].notas[j];
        }

        if (alunos[i].notas.length > 0) {
            media = media / alunos[i].notas.length;
        }

        lista.innerHTML += `
            <p>
                ${alunos[i].nome} - ${alunos[i].turma}
                Média: ${media.toFixed(1)}
                Faltas: ${alunos[i].faltas}
                <button onclick="editar(${i})">Editar</button>
                <button onclick="excluir(${i})">Excluir</button>
                <button onclick="adicionarNota(${i})">Nota</button>
                <button onclick="adicionarFalta(${i})">Falta</button>
            </p>
        `;
    }

    document.getElementById("total").innerText = alunos.length;
}

function editar(i) {
    let nome = prompt("Digite o novo nome:");

    if (nome != "") {
        alunos[i].nome = nome;
        salvar();
        mostrar();
    }
}

function excluir(i) {
    alunos.splice(i, 1);
    salvar();
    mostrar();
}

function adicionarNota(i) {
    let nota = Number(prompt("Digite a nota:"));

    if (nota >= 0 && nota <= 10) {
        alunos[i].notas.push(nota);
        salvar();
        mostrar();
    } else {
        alert("Nota inválida");
    }
}

function adicionarFalta(i) {
    alunos[i].faltas++;
    salvar();
    mostrar();
}

function buscar() {
    let nome = document.getElementById("busca").value.toLowerCase();
    let quantidade = 0;

    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].nome.toLowerCase().includes(nome)) {
            quantidade++;
        }
    }

    alert("Alunos encontrados: " + quantidade);
}

function imprimir() {
    window.print();
}

mostrar();

