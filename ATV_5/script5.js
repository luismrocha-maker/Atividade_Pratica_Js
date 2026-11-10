
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

function carregarCursos() {
    let select = document.getElementById("curso");
    let cursos = [];

    alunos.forEach(aluno => {
        if (!cursos.includes(aluno.curso)) {
            cursos.push(aluno.curso);
        }
    });

    cursos.forEach(curso => {
        select.innerHTML += `<option value="${curso}">${curso}</option>`;
    });
}

function pesquisar() {
    let nome = document.getElementById("nome").value.toLowerCase();
    let curso = document.getElementById("curso").value;

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    let encontrado = alunos.find(aluno =>
        aluno.nome.toLowerCase().includes(nome)
    );

    let resultados = alunos.filter(aluno => {
        return aluno.nome.toLowerCase().includes(nome) &&
        (curso == "" || aluno.curso == curso);
    });

    document.getElementById("quantidade").innerHTML =
        "Resultados encontrados: " + resultados.length;

    if (resultados.length == 0) {
        lista.innerHTML = "Nenhum aluno encontrado";
        return;
    }

    resultados.forEach(aluno => {
        lista.innerHTML += `
            <div class="aluno">
                Nome: ${aluno.nome}<br>
                Idade: ${aluno.idade}<br>
                Curso: ${aluno.curso}<br>
                Matrícula: ${aluno.matricula}
            </div>
        `;
    });
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("curso").value = "";

    document.getElementById("lista").innerHTML = "";
    document.getElementById("quantidade").innerHTML =
        "Resultados encontrados: 0";
}

carregarCursos();
