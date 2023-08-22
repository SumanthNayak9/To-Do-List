

document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo");
    const todoTimein = document.getElementById("Time");
    const todoTable = document.getElementById("todo-table");
    const sortButton = document.getElementById("sort-button");
    const addedTodos =[];
    let sortAsc =true;

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const todoText = todoInput.value;
        const todoTime = todoTimein.value;
        // Check if the todoText is not empty and is not already in the addedTodos array
        if (todoText && !addedTodos.includes(todoText)) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${todoText}</td>
                <td>${todoTime}</td>
                <td><button id="btn" class="toggle-button btn btn-success" >Done</button></td>
                <td><button id="btn" class="delete-button btn btn-outline-light" ><i class="fas fa-trash delete-button"></i></button></td>
                <td><button id="btn" class="edit-button btn btn-outline-light" ><i class="fas fa-edit edit-button"></i></button></td>
            `;

            todoTable.querySelector("tbody").appendChild(newRow);
            addedTodos.push(todoText);
            console.log(addedTodos)
            todoInput.value = "";
            todoTimein.value = "";

        }
        else if (addedTodos.includes(todoText)) {
            alert("The todo item already exists in the list.");
        }
    });

    todoTable.addEventListener("click", function(event) {
        const target = event.target;

        if (target.classList.contains("delete-button")) {
            const todoRow = target.closest("tr");
            const todoText = todoRow.querySelector("td:first-child").textContent;
            const index = addedTodos.indexOf(todoText);
            if (index!=1){
                addedTodos.splice(index,1);
            }
            todoRow.remove();

        }
        else if (target.classList.contains("edit-button")) {
            const todoRow = target.closest("tr");
            const todoTextCell = todoRow.querySelector("td:first-child");
            const todoText = todoTextCell.textContent;

            const newText = prompt("Edit todo:", todoText);

            if (newText && newText !== todoText && !addedTodos.includes(newText)) {
                const index = addedTodos.indexOf(todoText);
                if (index !== -1) {
                    addedTodos[index] = newText;
                }
                todoTextCell.textContent = newText;
            }
            else if (addedTodos.includes(newText)) {
                alert("The edited todo item already exists in the list.");
            }
        }
        else if (target.classList.contains("toggle-button")) {
            const todoRow = target.closest("tr");
            const todoText = todoRow.querySelector("td:first-child");

            todoRow.classList.toggle("done");
            if (todoRow.classList.contains("done")) {
                todoText.classList.add("done");
                target.classList.remove("btn-success");
                target.classList.add("btn-danger");
                target.textContent = "Undone";
            } else {
                todoText.classList.remove("done");
                target.classList.remove("btn-danger");
                target.classList.add("btn-success");
                target.textContent = "Done";
            }
        }
    });

 
    sortButton.addEventListener("click", function() {
        const rows = Array.from(todoTable.querySelectorAll("tbody tr"));
        const doneRows = rows.filter(row => row.classList.contains("done"));
        const undoneRows = rows.filter(row => !row.classList.contains("done"));

        // Clear the table
        todoTable.querySelector("tbody").innerHTML="";

        if (sortAsc === true){

        // Append sorted rows back to the table
            undoneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
            doneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
            sortAsc=false;
        }
        else{
            doneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
            undoneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
            sortAsc=true;

        }

    });


});
