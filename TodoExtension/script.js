document.addEventListener('DOMContentLoaded', () => {
    let todoInput = document.getElementById("todo-input")
    let addTaskBtn = document.getElementById("add-task-btn")
    let todoList = document.getElementById("todo-list")
    
    let tasks = JSON.parse(localStorage.getItem('task')) ||[];
    
    tasks.forEach(task => randerTask(task));
    
    addTaskBtn.addEventListener('click', (e) => {
        const taskText = todoInput.value.trim()
        if(taskText === "") return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask)
        saveTask()
        randerTask(newTask)
        todoInput.value = '' //clean the todo input area
        console.log(tasks);
        
    })
    
    
    function saveTask(){
        localStorage.setItem('task', JSON.stringify(tasks))
    
    }
    
    function randerTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if(task.completed) li.classList.add("completed")
        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            saveTask()
        })
         
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id)
            li.remove()
            saveTask()
        })
    
        todoList.appendChild(li);
        
    }
    
    
    });
    
    
    