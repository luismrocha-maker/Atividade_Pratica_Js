
let alunos = JSON.parse(localStorage.getItem("alunos9")) || [];

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let turma = document.getElementById("turma").value;

    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);
    let nota3 = Number(document.getElementById("nota3").value);

    let aulas = Number(document.getElementById("aulas").value);
    let faltas = Number(document.getElementById("faltas").value);

    if (nome == "" || turma == "" ||
        document.getElementById("nota1").value == "" ||
        document.getElementById("nota2").value == "" ||
        document.getElementById("nota3").value == "" ||
        document.getElementById("aulas").value == "" ||
        document.getElementById("faltas").value == "") {

        alert("Preencha todos os campos");
        return;
    }

    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 ||
        nota3 < 0 || nota3 > 10 || aulas <= 0 ||
        faltas < 0 || faltas > aulas || faltas % 1 != 0 ||
        aulas % 1 != 0) {

        alert("Digite valores válidos");
        return;
    }

    alunos.push({
        nome: nome,
        turma: turma,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        aulas: aulas,
        faltas: faltas
    });

    localStorage.setItem("alunos9", JSON.stringify(alunos));

    document.getElementById("nome").value = "";
    document.getElementById("turma").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    document.getElementById("aulas").value = "";
    document.getElementById("faltas").value = "";

    carregarTurmas();
    mostrar();
}

function carregarTurmas() {
    let filtro = document.getElementById("filtro");
    let turmaAtual = filtro.value;

    let turmas = [];

    alunos.forEach(aluno => {
        if (!turmas.includes(aluno.turma)) {
            turmas.push(aluno.turma);
        }
    });

    filtro.innerHTML = '<option value="">Todas as turmas</option>';

    turmas.forEach(turma => {
        filtro.innerHTML += `
            <option value="${turma}">${turma}</option>
        `;
    });

    filtro.value = turmaAtual;
}

function mostrar() {
    let turma = document.getElementById("filtro").value;

    let resultado = alunos.filter(aluno =>
        turma == "" || aluno.turma == turma
    );

    let mediaGeral = resultado.reduce((soma, aluno) => {
        return soma + (aluno.nota1 + aluno.nota2 + aluno.nota3) / 3;
    }, 0);

    if (resultado.length > 0) {
        mediaGeral = mediaGeral / resultado.length;
    }

    let aprovados = 0;
    let recuperacao = 0;
    let reprovados = 0;

    resultado.forEach(aluno => {
        let media = (aluno.nota1 + aluno.nota2 + aluno.nota3) / 3;

        if (media >= 7) {
            aprovados++;
        } else if (media >= 5) {
            recuperacao++;
        } else {
            reprovados++;
        }
    });

    let total = resultado.length;

    let percAprovados = total > 0 ? aprovados / total * 100 : 0;
    let percRecuperacao = total > 0 ? recuperacao / total * 100 : 0;
    let percReprovados = total > 0 ? reprovados / total * 100 : 0;

    let totalAulas = resultado.reduce((soma, aluno) =>
        soma + aluno.aulas, 0
    );

    let totalFaltas = resultado.reduce((soma, aluno) =>
        soma + aluno.faltas, 0
    );

    let frequencia = totalAulas > 0 ?
        (totalAulas - totalFaltas) / totalAulas * 100 : 0;

    document.getElementById("indicadores").innerHTML = `
        Alunos: ${total}<br>
        Média geral: ${mediaGeral.toFixed(2)}<br>
        Aprovados: ${percAprovados.toFixed(1)}%<br>
        Recuperação: ${percRecuperacao.toFixed(1)}%<br>
        Reprovados: ${percReprovados.toFixed(1)}%<br>
        Frequência geral: ${frequencia.toFixed(1)}%
    `;

    document.getElementById("grafico").innerHTML = `
        <p>Aprovados: ${aprovados}</p>
        <div class="barra" style="width: ${percAprovados}%">
            ${percAprovados.toFixed(1)}%
        </div>

        <p>Recuperação: ${recuperacao}</p>
        <div class="barra" style="width: ${percRecuperacao}%">
            ${percRecuperacao.toFixed(1)}%
        </div>

        <p>Reprovados: ${reprovados}</p>
        <div class="barra" style="width: ${percReprovados}%">
            ${percReprovados.toFixed(1)}%
        </div>
    `;

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    resultado.forEach(aluno => {
        let media = (aluno.nota1 + aluno.nota2 + aluno.nota3) / 3;
        let presenca = (aluno.aulas - aluno.faltas) / aluno.aulas * 100;

        lista.innerHTML += `
            <div class="aluno">
                Nome: ${aluno.nome}<br>
                Turma: ${aluno.turma}<br>
                Média: ${media.toFixed(2)}<br>
                Frequência: ${presenca.toFixed(1)}%
            </div>
        `;
    });
}

carregarTurmas();
mostrar();
