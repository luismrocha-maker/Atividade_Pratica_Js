
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let idade = Number(document.getElementById("idade").value);
    let curso = document.getElementById("curso").value;
    let matricula = document.getElementById("matricula").value;

    let mensagem = document.getElementById("mensagem");

    if (nome == "" || idade <= 0 || document.getElementById("idade").value == "" ||
        curso == "" || matricula == "") {

        mensagem.innerHTML = "Preencha todos os campos corretamente";
        return;
    }

    let repetida = alunos.find(aluno => aluno.matricula == matricula);

    if (repetida) {
        mensagem.innerHTML = "Essa matrícula já está cadastrada";
        return;
    }

    let aluno = {
        nome: nome,
        idade: idade,
        curso: curso,
        matricula: matricula
    };

    alunos.push(aluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    mensagem.innerHTML = "Aluno cadastrado com sucesso!";

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("matricula").value = "";

    mostrarAlunos();
}

function mostrarAlunos() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    alunos.forEach(aluno => {
        lista.innerHTML += `
            <div class="aluno">
                Nome: ${aluno.nome}<br>
                Idade: ${aluno.idade}<br>
                Curso: ${aluno.curso}<br>
                Matrícula: ${aluno.matricula}
            </div>
        `;
    });

    document.getElementById("total").innerHTML =
        "Total de alunos: " + alunos.length;
}

mostrarAlunos();
