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

};
function displayTasks() {
    todoList.innerHTML = "";

    todo.forEach((item, index) => {
        const container = document.createElement("div");
        container.classList.add("todo-container");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");
        checkbox.id = `input-${index}`;
        checkbox.checked = item.disabled;

        checkbox.addEventListener("change", () => {
            ToggleTask(index);
        });

        const taskText = document.createElement("p");
        taskText.id = `todo-${index}`;
        taskText.textContent = item.text;
        taskText.className = item.disabled ? "disabled" : "";

        taskText.addEventListener("click", () => {
            editTask(index);
        });

        container.appendChild(checkbox);
        container.appendChild(taskText);

        todoList.appendChild(container);
    });

    todoCount.textContent = todo.length;
}

function ToggleTask(index){
    todo[index].disabled= !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}
function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo))
};
