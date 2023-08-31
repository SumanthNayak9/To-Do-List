document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo");
    const todoDatein = document.getElementById("Date");
    const todoTimein = document.getElementById("Time");
    const todoTable = document.getElementById("todo-table");
    const sortButton = document.getElementById("sort-button");
    let addedTodos = JSON.parse(localStorage.getItem("todos")) || [];console.log(addedTodos)
    let sortAsc = true;

    function updateLocalStorage(todos) {


                console.warn(todos, addedTodos)

        localStorage.setItem("todos", JSON.stringify(addedTodos));
    }

    // Function to render todos
    function renderTodos() {
         document.getElementById("accordionFlushExample").innerHTML="";
        todoTable.querySelector("tbody").innerHTML = "";
        addedTodos.forEach(todo => {
            renderAccordion(todo.text,todo.date,todo.time,todo.done)
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${todo.text}</td>
                <td>${todo.date}</td>
                <td>${todo.time}</td>
                <td><button class="toggle-button btn ${todo.done ? "btn-danger" : "btn-success"}">${todo.done ? "Undone" : "Done"}</button></td>
                <td><button class="delete-button btn btn-outline-light"><i class="fas fa-trash delete-button"></i></button></td>
                <td><button class="edit-button btn btn-outline-light"><i class="fas fa-edit edit-button"></i></button></td>
            `;
            if (todo.done) {
                newRow.classList.add("done");
            }
            todoTable.querySelector("tbody").appendChild(newRow);
        });

        console.log(addedTodos)
    }

    // Initial rendering
    renderTodos();


    function renderAccordion(todoText,todoDate,todoTime,SDS) {


    document.getElementById("accordionFlushExample").innerHTML+=(`<div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne+${todoDate}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      ${todoDate}
                    </button>
                  </h2>
                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne+${todoDate}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body"><p class="mb-0">${todoText} - ${todoTime} (${SDS ? "Done" : "Undone"})</p></div>
                  </div>
                </div>`);


}



    todoForm.addEventListener("submit", function(event){
        event.preventDefault();
        const todoText = todoInput.value;
        const todoDate = todoDatein.value;
        const todoTime = todoTimein.value;
        // Check if the todoText is not empty and is not already in the addedTodos array
        if (todoText && !addedTodos.some(todo => todo.text === todoText)){
            addedTodos.push({text: todoText, date: todoDate, time: todoTime, done:false});
            updateLocalStorage();
            renderTodos();
            todoInput.value = "";
            todoDatein.value = "";
            todoTimein.value = "";
            

        }
        else if (addedTodos.some(todo => todo.text === todoText)) {
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
            updateLocalStorage();
            renderTodos();

        }
        else if (target.classList.contains("edit-button")) {
            const todoRow = target.closest("tr");
            const todoTextCell = todoRow.querySelector("td:first-child");
            const todoText = todoTextCell.textContent;
            const newText = prompt("Edit todo:", todoText);

            if (newText && newText !== todoText && !addedTodos.includes(newText)) {
                const index = addedTodos.indexOf(todoText);
                if (index !== -1) {
                    const tmp = addedTodos[index];
                    tmp.text = newText;
                    addedTodos[index] = tmp;
                    // addedTodos[index] = newText;
                }
                todoTextCell.textContent = newText;
                renderTodos();
                updateLocalStorage();

            }
            else if (addedTodos.includes(newText)) {
                alert("The edited todo item already exists in the list.");
            }

            // updateLocalStorage();
            // renderTodos();
        }


    });

    todoTable.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("toggle-button")) {
            const todoRow = target.closest("tr");
            const todoText = todoRow.querySelector("td:first-child");

            todoRow.classList.toggle("done");
            if (todoRow.classList.contains("done")) {
                todoText.classList.add("done");
                target.classList.remove("btn-success");
                target.classList.add("btn-danger");
                target.textContent = "Undone";

                 for(let i=1;i<document.getElementsByTagName('tr').length;i++){

                    console.log(document.getElementsByTagName('tr')[i].textContent);
                    console.log(addedTodos);
                    if(document.getElementsByTagName('tr')[i].textContent.includes("Undone")){
                        addedTodos[i-1].done=true;
                    }

                }
                addedTodos = [...addedTodos]
                console.log(addedTodos)

                updateLocalStorage(addedTodos);

            } else {
                todoText.classList.add("done");
                target.classList.remove("btn-danger");
                target.classList.add("btn-success");
                target.textContent = "Done";

                 for(let i=1;i<document.getElementsByTagName('tr').length;i++){

                    console.log(document.getElementsByTagName('tr')[i].textContent);
                    console.log(addedTodos);
                    if(document.getElementsByTagName('tr')[i].textContent.includes("Done")){
                        addedTodos[i-1].done=false;
                    }

                }
                 console.log(addedTodos);
                updateLocalStorage();

            }
           
        }
        // renderTodos();
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
        updateLocalStorage();

    });
    updateLocalStorage();
    renderTodos();
});
