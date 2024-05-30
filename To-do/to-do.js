const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    tasklist.querySelectorAll("li").forEach(li => {
        const taskText = li.querySelector("span").textContent;
        const completed = li.querySelector("span").style.textDecoration === 'line-through';
        tasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="editButton" onClick="editTask(this)" ${task.completed ? "disabled" : ""}>Editar</button>
                <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
                <button class="completeButton" onClick="completeTask(this)">Concluir</button>
            `;
            if (task.completed) {
                li.querySelector("span").style.textDecoration = 'line-through';
            }
            tasklist.appendChild(li);
        });
    }
}

// Função para adicionar tarefa e salvar no localStorage
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${maxText}</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
            <button class="completeButton" onClick="completeTask(this)">Concluir</button>
        `;
        tasklist.appendChild(li);
        taskInput.value = "";
        saveTasks();
    }
}

// Função para marcar tarefa como concluída, desabilitar edição e salvar no localStorage
function completeTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    if (confirm("Você realmente deseja marcar esta tarefa como concluída?")) {
        span.style.textDecoration = 'line-through';
        const editButton = li.querySelector(".editButton");
        editButton.disabled = true;
        saveTasks();
    }
}

// Função para editar tarefa e salvar no localStorage
function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
        saveTasks();
    }
}

// Função para deletar tarefa e salvar no localStorage
function deleteTask(button) {
    const li = button.parentElement;
    tasklist.removeChild(li);
    saveTasks();
}

// Carregar tarefas ao iniciar
window.addEventListener("load", () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        const keepData = confirm("Deseja manter as informações inseridas anteriormente?");
        if (keepData) {
            loadTasks();
        } else {
            localStorage.removeItem("tasks");
        }
    }
});

// Pergunta antes de sair da página
window.onbeforeunload = (event) => {
    if (tasklist.children.length > 0) {
        const message = "Você tem alterações não salvas. Deseja realmente sair?";
        event.returnValue = message;
        return message;
    }
};
