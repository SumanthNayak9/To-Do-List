// // let todoByDate = {};
// document.addEventListener("DOMContentLoaded", function(){
    
// })

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

function formSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting by default

    const usernameInput = document.querySelector("input[name='username']").value.trim();

    if (usernameInput !== "") {
        let existingUsers = getCookie('users');

        if (!existingUsers) {
            existingUsers = [];
        } else {
            existingUsers = JSON.parse(existingUsers);
        }

        if (!existingUsers.includes(usernameInput)) {
            existingUsers.push(usernameInput);

            document.cookie = `users=${JSON.stringify(existingUsers)}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`;
        }

        document.cookie = `userId=${usernameInput}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`;
        window.location.href = ''
    }
}

function logOut() {
    document.cookie = `userId=; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/`
    window.location.href = ''
}

document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo");
    const todoDatein = document.getElementById("Date");
    const todoTimein = document.getElementById("Time");
    const todoTable = document.getElementById("todo-table");
    const sortButton = document.getElementById("sort-button");
    const existingUsers = document.getElementById("existing-user");
    // let todoByDate = JSON.parse(localStorage.getItem("todos")) || {};
    const editId = [];
    let sortAsc = true;
    const userId= getCookie("userId");
    let userTodoLists = getUserTodoListsFromLocalStorage(userId);
    let todoByDate = userTodoLists || {};

    const modal = new bootstrap.Modal(document.getElementById("login-modal"));
    if(!userId){
        modal.show();
    }

    function showExistingUsers() {
        const existingUsersDiv = document.getElementById("existing-users");
        const existingUsers = JSON.parse(getCookie('users')) || [];

        let allUsers = '<ul class="list-group">';

        existingUsers.forEach((user) => {
            allUsers += `<li class="list-group-item existing-user">${user}</li>`
        });
        allUsers += '</ul>'
        existingUsersDiv.innerHTML = allUsers;

        // Adding click events for existing users

        document.querySelectorAll(".existing-user").forEach((userItem) => {
            userItem.addEventListener('click', function(event) {
                const userId = event.target.innerHTML;
                document.cookie = `userId=${userId}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`;
                window.location.href = ''

            })
        })
    }
    showExistingUsers();


    function showHideToggleContainer() {
        const todoContainer = document.getElementById("todo-container");
        const userExists = getCookie('userId');

        if (!userExists) {
            todoContainer.style.display = 'none';
        }

    }
    showHideToggleContainer();

   
    function getUserTodoListsFromLocalStorage(userId) {
        const userTodoListsKey = `todos_${userId}`;
        return JSON.parse(localStorage.getItem(userTodoListsKey)) || {};
    }

    function vg() {
        let temp = {}
        for (let y = 0; y < todoByDate.length; y++) {

            if (Object.keys(temp).includes(todoByDate[y].date)) {
                temp[todoByDate[y].date].unshift({
                    "item": todoByDate[y].text,
                    "time": todoByDate[y].time,
                    "status": 'done'
                });
            } else {
                temp[todoByDate[y].date] = [{
                    "item": todoByDate[y].text,
                    "time": todoByDate[y].time,
                    "status": 'done'
                }];
            }

        }
        todoByDate = temp;
    }

    function updateLocalStorage() {
        const userId = getCookie('userId');
        const userTodoListsKey = `todos_${userId}`;
        localStorage.setItem(userTodoListsKey, JSON.stringify(todoByDate));
    }



    // Function to render todos
    function renderTodos() {
        document.getElementById("accordionFlushExample").innerHTML = "";
        todoTable.querySelector("tbody").innerHTML = "";
        Object.keys(todoByDate)?.forEach(todo => {

            renderAccordion(todoByDate)

            for (let k = 0; k < todoByDate[todo].length; k++) {
                if (!todoByDate[todo][k].sec) {
                    todoByDate[todo][k].sec = new Date().getTime();

                }


                const newRow = document.createElement("tr");
                newRow.innerHTML = `
            <td>${todoByDate[todo][k].item}</td>
            <td>${todo}</td>
            <td>${todoByDate[todo][k].time}</td>
            <td><button  value='${k}${todo}' id='${k}${todo}' class="toggle-button btn ${todoByDate[todo][k].status ? "btn-danger" : "btn-success"}" toggle-id="${todoByDate[todo][k].sec}">${todoByDate[todo][k].status ? "Undone" : "Done" }</button></td>
            <td><i delete-id="${todoByDate[todo][k].sec}" value='${k}${todo}' class=" p-2.5 m-2 deleteId-identifier delete-button btn btn-outline-light fas fa-trash delete-button"></i></td>
            <td ><i id="${todoByDate[todo][k].sec}" value='${k}${todo}' class=" p-2 m-2 id-identifier edit-button btn btn-outline-light fas fa-edit edit-button"></i></td>
            <td><i modal-id="${todoByDate[todo][k].sec}" data-bs-toggle="modal" data-bs-target="#exampleModal" class=" p-2 m-2 modal-button btn btn-outline-light bi bi-info-square-fill"></i></td>
            `;
                if (todoByDate[todo][k].status) {
                    newRow.classList.add("status");
                }
                todoTable.querySelector("tbody").appendChild(newRow);

            }
        });
        addClickEvents()

    }

    // Initial rendering
    renderTodos();

    function renderAccordion(todoByDate) {
        document.getElementById("accordionFlushExample").innerHTML = '';
        let acc ='';
        Object.keys(todoByDate)?.forEach(todo => {
            acc += `<div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne${(todo)}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseO${(todo)}" aria-expanded="false" aria-controls="flush-collapseO${(todo)}">
        ${todo}
        </button>
        </h2>
        `

            for (let k = 0; k < todoByDate[todo].length; k++) {

                acc += ` <div id="flush-collapseO${(todo)}" class="accordion-collapse collapse" aria-labelledby="flush-headingO${(todo)}${(todo)}" data-bs-parent="#accordionFlushExample">

         <div class="accordion-body"><p class="mb-0">${todoByDate[todo][k].item} - ${todoByDate[todo][k].time} (${todoByDate[todo][k].status ? "Complete" : "Incomplete"})</p></div>
         </div>`

            }

            acc += "</div>"
        })
        document.getElementById("accordionFlushExample").innerHTML = acc;
    }

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const todoText = todoInput.value;
        const todoDate = todoDatein.value;
        const todoTime = todoTimein.value;
        if (Object.keys(todoByDate).includes(todoDate)) {
            todoByDate[todoDate].unshift({
                "item": todoText,
                "time": todoTime,
                "status": false
            });
        } else {
            todoByDate[todoDate] = [{
                "item": todoText,
                "time": todoTime,
                "status": false
            }]
        }
        console.warn('Add todoByDate', todoByDate)


        if (todoText && !Object.keys(todoByDate).includes(todo => todo.text === todoText)) {
            renderTodos();
            todoInput.value = "";
            // todoDatein.value = "";
            // todoTimein.value = "";


        } else if (todoByDate.some(todo => todo.text === todoText)) {}
        updateLocalStorage();
        addClickEvents();

    });

    
    function addClickEvents() {

        setTimeout(() => {
            const editBtn = document.querySelectorAll('.edit-button');
            for (let e = 0; e < editBtn.length; e++) {
                editBtn[e].addEventListener("click", function(event) {
                    const target = event.target;
                    const editId = target.getAttribute("id");
                    let arrayDate = Object.keys(todoByDate);
                    for (let i = 0; i < arrayDate.length; i++) {
                        for (let j = 0; j < todoByDate[arrayDate[i]].length; j++) {
                            if (editId == todoByDate[arrayDate[i]][j].sec) {
                                const todoText = todoByDate[arrayDate[i]][j].item;
                                const newText = prompt("Edit todo:", todoText);
                                todoByDate[arrayDate[i]][j].item = newText;
                                renderTodos();
                                updateLocalStorage();
                            }
                        }
                    }
                });
            }

        

            const deleteBtn = document.querySelectorAll('.delete-button');
            for (let q = 0; q < deleteBtn.length; q++) {
                deleteBtn[q].addEventListener("click", function(event) {
                    const target = event.target;
                    const deleteId = target.getAttribute("delete-id");
                    if (!deleteId) {
                        return
                    }
                    let arrayDate = Object.keys(todoByDate);
                    for (let i = 0; i < arrayDate.length; i++) {
                        for (let j = 0; j < todoByDate[arrayDate[i]].length; j++) {
                            if (deleteId == todoByDate[arrayDate[i]][j].sec) {
                                todoByDate[arrayDate[i]].splice(j, 1);
                                if(todoByDate[arrayDate[i]].length==0){
                                    delete todoByDate[arrayDate[i]];
                                }
                                
                                updateLocalStorage();
                                renderTodos();
                                break

                            }
                        }
                    }
                });
            };


            const toggleBtn = document.querySelectorAll('.toggle-button');
            for (let t=0;t<toggleBtn.length;t++){
                toggleBtn[t].addEventListener("click", function(event) {
                    const target = event.target;
                    const toggleId = target.getAttribute("toggle-id");
                    if(!toggleId){
                        return
                    }

                    let arrayDate = Object.keys(todoByDate);
                    for (let i = 0; i < arrayDate.length; i++){
                        for (let j = 0; j < todoByDate[arrayDate[i]].length; j++){
                            if (toggleId == todoByDate[arrayDate[i]][j].sec){
                                // todoByDate.toggle("status");

                                todoByDate[arrayDate[i]][j].status = !todoByDate[arrayDate[i]][j].status;

                                updateLocalStorage();
                                renderTodos();
                                break;

                            }
                        }
                    }
                });
            }


            const modalBtn = document.querySelectorAll('.modal-button');
            for(let m=0;m<modalBtn.length;m++){
                modalBtn[m].addEventListener("click", function(event){
                    const target=event.target;
                    const modalId= target.getAttribute("modal-id");
                    if(!modalId){
                        return
                    }
                    let arrayDate=Object.keys(todoByDate);
                    for(let i=0;i<arrayDate.length;i++){
                        for(let j=0;j< todoByDate[arrayDate[i]].length;j++){
                            if (modalId == todoByDate[arrayDate[i]][j].sec){
                                // console.log(modalId,'modalId')
                                // console.log(todoByDate[arrayDate[i]][j].sec, 'timestamp')

                                // console.log(todoByDate[arrayDate[i]][j].item)
                                console.log(todoByDate[arrayDate[i]])
                                console.log(arrayDate)
                                console.log(arrayDate[i])
                                document.getElementById("textId").innerText = todoByDate[arrayDate[i]][j].item;
                                document.getElementById("dateId").innerText = arrayDate[i];
                                document.getElementById("timeId").innerText = todoByDate[arrayDate[i]][j].time;
                                if (todoByDate[arrayDate[i]][j].status == true){
                                    document.getElementById("statusId").innerText = "Completed";

                                }
                                else{
                                    document.getElementById("statusId").innerText = "Incomplete";
                                }
                                
                                
                            }
                        }
                    }

                })
            };

        }, 0)
    }


    sortButton.addEventListener("click", function() {
        const rows = Array.from(todoTable.querySelectorAll("tbody tr"));
        const doneRows = rows.filter(row => row.classList.contains("status"));
        const undoneRows = rows.filter(row => !row.classList.contains("status"));

        // Clear the table
        todoTable.querySelector("tbody").innerHTML = "";

        if (sortAsc === true) {

            // Append sorted rows back to the table
            undoneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
            doneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
            sortAsc = false;
        } else {
            doneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
            undoneRows.forEach(row => todoTable.querySelector("tbody").appendChild(row));
            sortAsc = true;

        }
        updateLocalStorage();

    });

     function displayUserTodoList(userId) {
        fetch(`/your-api-endpoint/user/${userId}/todo-list`)
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => console.error(error));
     }    
    
    function disableBackButton() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
}

    disableBackButton();



    updateLocalStorage();
});
