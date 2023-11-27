document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    addTaskBtn.addEventListener('click', addTask);
    clearCompletedBtn.addEventListener('click', clearCompleted);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span style="opacity: 0.4;">${taskText}</span>
                <button onclick="toggleTask(this)">Concluir</button>
                <button onclick="editTask(this)">Editar</button>
                <button onclick="removeTask(this)">Excluir</button>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    }

    function toggleTask(button) {
        const taskItem = button.parentElement;
        taskItem.classList.toggle('completed');
    }

    function editTask(button) {
        const taskItem = button.parentElement;
        const span = taskItem.querySelector('span');
        const newText = prompt('Editar tarefa:', span.textContent);
        if (newText !== null) {
            span.textContent = newText;
        }
    }

    function removeTask(button) {
        const taskItem = button.parentElement;
        taskList.removeChild(taskItem);
    }

    function clearCompleted() {
        const completedTasks = taskList.querySelectorAll('.completed');
        completedTasks.forEach(task => taskList.removeChild(task));
    }

    function filterTasks(filter) {
        const taskItems = taskList.querySelectorAll('.task-item');
        taskItems.forEach(task => {
            const isCompleted = task.classList.contains('completed');
            switch (filter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'pending':
                    task.style.display = isCompleted ? 'none' : 'flex';
                    break;
                case 'completed':
                    task.style.display = isCompleted ? 'flex' : 'none';
                    break;
            }
        });
    }
});
