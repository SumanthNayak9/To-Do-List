document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo");
    const todoTimein = document.getElementById("Time");
    const todoTable = document.getElementById("todo-table");
    const sortButton = document.getElementById("sort-button");
    const addedTodos =[];

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
                <td><button id="btn" class="toggle-button">Done</button></td>
                <td><button id="btn" class="delete-button"><i class="fas fa-trash"></i></button></td>
                <td><button id="btn" class="edit-button"><i class="fas fa-edit"></i></button></td>
            `;

            todoTable.querySelector("tbody").appendChild(newRow);
            addedTodos.push(todoText);
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
            target.closest("tr").remove();
        } else if (target.classList.contains("edit-button")) {
            const todoText = target.closest("tr").querySelector("td:first-child");
            const newText = prompt("Edit todo:", todoText.textContent);

            if (newText) {
                todoText.textContent = newText;
            }
        }
        else if (target.classList.contains("toggle-button")) {
            const todoRow = target.closest("tr");
            const todoText = todoRow.querySelector("td:first-child");

            todoRow.classList.toggle("done");
            if (todoRow.classList.contains("done")) {
                todoText.classList.add("done");
                target.textContent = "Undone";
            } else {
                todoText.classList.remove("done");
                target.textContent = "Done";
            }
        }
    });

 
    sortButton.addEventListener("click", function()) {
        const rows = Array.from(todoTable.querySelectorAll("tbody tr"));
        const doneRows = rows.filter(row => row.classList.contains("done"));
        const undoneRows = rows.filter(row => !row.classList.contains("done"));

        // Clear the table
        todoTable.querySelector("tbody").innerHTML="";

        // Append sorted rows back to the table
        undoneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
        doneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
    };


});
