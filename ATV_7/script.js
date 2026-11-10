
let alunos = JSON.parse(localStorage.getItem("alunos7")) || [];
let frequencias = JSON.parse(localStorage.getItem("frequencias")) || [];

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let matricula = document.getElementById("matricula").value;
    let turma = document.getElementById("turma").value;
    let curso = document.getElementById("curso").value;

    let mensagem = document.getElementById("mensagem");

    if (nome == "" || matricula == "" || turma == "" || curso == "") {
        mensagem.innerHTML = "Preencha todos os campos";
        return;
    }

    let repetido = alunos.find(aluno => aluno.matricula == matricula);

    if (repetido) {
        mensagem.innerHTML = "Matrícula já cadastrada";
        return;
    }

    alunos.push({
        nome: nome,
        matricula: matricula,
        turma: turma,
        curso: curso
    });

    salvar();

    mensagem.innerHTML = "Aluno cadastrado com sucesso!";

    document.getElementById("nome").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("turma").value = "";
    document.getElementById("curso").value = "";

    carregarAlunos();
    mostrarHistorico();
}

function carregarAlunos() {
    let select = document.getElementById("aluno");

    select.innerHTML = '<option value="">Selecione um aluno</option>';

    alunos.forEach(aluno => {
        select.innerHTML += `
            <option value="${aluno.matricula}">
                ${aluno.nome} - ${aluno.turma}
            </option>
        `;
    });
}

function registrar() {
    let matricula = document.getElementById("aluno").value;
    let data = document.getElementById("data").value;
    let situacao = document.getElementById("situacao").value;

    if (matricula == "" || data == "") {
        alert("Selecione um aluno e uma data");
        return;
    }

    let repetido = frequencias.find(item =>
        item.matricula == matricula && item.data == data
    );

    if (repetido) {
        alert("Já existe um registro nessa data");
        return;
    }

    frequencias.push({
        matricula: matricula,
        data: data,
        situacao: situacao
    });

    salvar();
    mostrarHistorico();

    alert("Frequência registrada!");
}

function mostrarHistorico() {
    let historico = document.getElementById("historico");

    historico.innerHTML = "";

    alunos.forEach(aluno => {
        let registros = frequencias.filter(item =>
            item.matricula == aluno.matricula
        );

        registros.sort((a, b) => a.data.localeCompare(b.data));

        let presencas = registros.filter(item =>
            item.situacao == "Presença"
        ).length;

        let faltas = registros.filter(item =>
            item.situacao == "Falta não justificada" ||
            item.situacao == "Falta justificada"
        ).length;

        historico.innerHTML += `
            <div class="aluno">
                <strong>${aluno.nome}</strong><br>
                Matrícula: ${aluno.matricula}<br>
                Turma: ${aluno.turma}<br>
                Curso: ${aluno.curso}<br>
                Presenças: ${presencas}<br>
                Faltas: ${faltas}<br>
                <hr>
                Histórico:<br>
        `;

        registros.forEach(item => {
            historico.innerHTML += `
                ${item.data} - ${item.situacao}<br>
            `;
        });

        historico.innerHTML += "</div>";
    });

    mostrarAlertas();
}

function mostrarAlertas() {
    let alertas = document.getElementById("alertas");

    alertas.innerHTML = "";

    alunos.forEach(aluno => {
        let registros = frequencias.filter(item =>
            item.matricula == aluno.matricula
        );

        registros.sort((a, b) => a.data.localeCompare(b.data));

        let consecutivas = 0;

        registros.forEach(item => {
            if (item.situacao == "Falta não justificada") {
                consecutivas++;
            } else {
                consecutivas = 0;
            }

            if (consecutivas == 4) {
                alertas.innerHTML += `
                    <div class="alerta">
                        Atenção! ${aluno.nome} possui mais de
                        três faltas consecutivas sem justificativa.
                        Turma: ${aluno.turma}
                    </div>
                `;
            }
        });
    });

    if (alertas.innerHTML == "") {
        alertas.innerHTML = "Nenhum alerta no momento";
    }
}

function salvar() {
    localStorage.setItem("alunos7", JSON.stringify(alunos));
    localStorage.setItem("frequencias", JSON.stringify(frequencias));
}

carregarAlunos();
mostrarHistorico();
