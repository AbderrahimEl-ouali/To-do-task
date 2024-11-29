let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput")
const todoList = document.getElementById("todolist")
const todoCount = document.getElementById("todocount")
const addButton = document.querySelector(".btn")
const deleteButton = document.getElementById("deleteButton")

document.addEventListener("DOMContentLoaded",function(){
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function(event){
        if (event.key==="Enter"){
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click",deleteAllTasks);
    displayTasks(); 
});

function addTask(){
const newTask = todoInput.value.trim();
if (newTask !== ""){
    todo.push({
        text:newTask,disabled:false
    });
    saveToLocalStorage();
    todoInput.value="";
    displayTasks();
};
};
function deleteAllTasks(){
    todo = [];  
    saveToLocalStorage();
    displayTasks();
};
function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
            </div>`;

        const checkbox = p.querySelector(".todo-checkbox");
        checkbox.addEventListener("change", () => {
            ToggleTask(index);
        });

        todoList.appendChild(p);
    });
    let Count= document.getElementById('count')
    Count.innerHTML = todo.length;
}

function ToggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}


function ToggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo))
};