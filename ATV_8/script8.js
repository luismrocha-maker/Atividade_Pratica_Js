
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "Todas";

function adicionar() {
    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let prioridade = document.getElementById("prioridade").value;
    let prazo = document.getElementById("prazo").value;

    if (titulo == "" || descricao == "" || prazo == "") {
        alert("Preencha todos os campos");
        return;
    }

    tarefas.push({
        titulo: titulo,
        descricao: descricao,
        prioridade: prioridade,
        prazo: prazo,
        concluida: false
    });

    salvar();

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prazo").value = "";

    mostrar();
}

function mostrar() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let total = tarefas.length;
    let concluidas = tarefas.filter(t => t.concluida).length;
    let pendentes = total - concluidas;

    document.getElementById("contadores").innerHTML =
        "Total: " + total +
        "<br>Concluídas: " + concluidas +
        "<br>Pendentes: " + pendentes;

    let resultado = tarefas.filter(tarefa => {
        let atrasada = new Date(tarefa.prazo + "T00:00:00") < hoje;

        if (filtroAtual == "Pendente") {
            return !tarefa.concluida && !atrasada;
        }

        if (filtroAtual == "Concluída") {
            return tarefa.concluida;
        }

        if (filtroAtual == "Atrasada") {
            return !tarefa.concluida && atrasada;
        }

        return true;
    });

    resultado.forEach(tarefa => {
        let indice = tarefas.indexOf(tarefa);

        let classe = "tarefa";

        if (tarefa.concluida) {
            classe += " concluida";
        } else if (new Date(tarefa.prazo + "T00:00:00") < hoje) {
            classe += " atrasada";
        }

        lista.innerHTML += `
            <div class="${classe}">
                <strong>${tarefa.titulo}</strong><br>
                ${tarefa.descricao}<br>
                Prioridade: ${tarefa.prioridade}<br>
                Prazo: ${tarefa.prazo}<br>
                Situação: ${tarefa.concluida ? "Concluída" : "Pendente"}<br>

                <button onclick="concluir(${indice})">Concluir</button>
                <button onclick="editar(${indice})">Editar</button>
                <button onclick="excluir(${indice})">Excluir</button>
            </div>
        `;
    });

    if (resultado.length == 0) {
        lista.innerHTML = "Nenhuma tarefa encontrada";
    }
}

function concluir(indice) {
    tarefas[indice].concluida = !tarefas[indice].concluida;
    salvar();
    mostrar();
}

function editar(indice) {
    let novoTitulo = prompt("Novo título:", tarefas[indice].titulo);

    if (novoTitulo == null || novoTitulo.trim() == "") {
        return;
    }

    let novaDescricao = prompt("Nova descrição:", tarefas[indice].descricao);

    if (novaDescricao == null || novaDescricao.trim() == "") {
        return;
    }

    tarefas[indice].titulo = novoTitulo;
    tarefas[indice].descricao = novaDescricao;

    salvar();
    mostrar();
}

function excluir(indice) {
    tarefas.splice(indice, 1);
    salvar();
    mostrar();
}

function filtrar(tipo) {
    filtroAtual = tipo;
    mostrar();
}

function ordenar() {
    let ordem = document.getElementById("ordem").value;

    if (ordem == "prazo") {
        tarefas.sort((a, b) => a.prazo.localeCompare(b.prazo));
    } else {
        let valores = {
            "Alta": 1,
            "Média": 2,
            "Baixa": 3
        };

        tarefas.sort((a, b) =>
            valores[a.prioridade] - valores[b.prioridade]
        );
    }

    salvar();
    mostrar();
}

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

mostrar();
