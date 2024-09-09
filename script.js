let currrentToDoList = JSON.parse(localStorage.getItem("toDoList")) || [];

const input = document.querySelector("input");
const toDoTable = document.getElementById("to-do-table");

input.placeholder = "Enter a task"

let generateCode = () => {
    return (Math.random().toString(36).substring(2, 7) + Date.now().toString(36));
}

function updateLocalStorage() {
    localStorage.setItem("toDoList", JSON.stringify(currrentToDoList));
}

function addToTable(newToDo) {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = newToDo.Id.slice(0, 3) + "...";
    row.appendChild(idCell);

    const toDoCell = document.createElement("td");
    toDoCell.textContent = newToDo.toDo;
    row.appendChild(toDoCell);

    const statusCell = document.createElement("td");
    statusCell.textContent = newToDo.status;
    row.appendChild(statusCell);

    const actionsCell = document.createElement("td");
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.textContent = "Complete";
    actionsDiv.appendChild(completeBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    actionsDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    actionsDiv.appendChild(deleteBtn);

    actionsCell.appendChild(actionsDiv);
    row.appendChild(actionsCell);

    toDoTable.appendChild(row);

    completeBtn.addEventListener("click", () => {
        statusCell.innerText = "completed";
        toDoCell.style.color = "red";
        toDoCell.style.textDecoration = "line-through";
        newToDo.status = statusCell.innerText;
        updateLocalStorage(); 
    });

    editBtn.addEventListener("click", () => {
        const updatedToDo = prompt("Edit your task", newToDo.toDo);
        toDoCell.innerText = updatedToDo;
        newToDo.toDo = updatedToDo;
        updateLocalStorage();
    });

    deleteBtn.addEventListener("click", () => {
        currrentToDoList = currrentToDoList.filter(item => item.Id !== newToDo.Id);
        updateLocalStorage(); 
        row.remove();
    });
}

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => {
    const toDo = input.value.trim();
    
    const newToDo = {
        Id: generateCode(),
        toDo: toDo,
        status: "assigned"
    };
        
    currrentToDoList.push(newToDo);
    updateLocalStorage(); 
    input.value = ''; 
    addToTable(newToDo);
});

window.addEventListener("load", () => {
    currrentToDoList.forEach(toDoItem => addToTable(toDoItem));
});
