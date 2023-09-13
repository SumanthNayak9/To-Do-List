// let todoByDate = {};
document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo");
    const todoDatein = document.getElementById("Date");
    const todoTimein = document.getElementById("Time");
    const todoTable = document.getElementById("todo-table");
    const sortButton = document.getElementById("sort-button");
    let todoByDate = JSON.parse(localStorage.getItem("todos")) || {};
    const editId = [];
    console.log(todoByDate)
    // console.log(editBtn)
    let sortAsc = true;


    function vg() {
        let temp = {}
        for (let y = 0; y < todoByDate.length; y++) {



            if (Object.keys(temp).includes(todoByDate[y].date)) {
                temp[todoByDate[y].date].push({
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
        console.log(temp)
        todoByDate = temp;
    }

    function updateLocalStorage() {


        console.warn(1, todoByDate)

        localStorage.setItem("todos", JSON.stringify(todoByDate));
    }



    // Function to render todos
    function renderTodos() {
        document.getElementById("accordionFlushExample").innerHTML = "";
        todoTable.querySelector("tbody").innerHTML = "";
        console.warn('todoByDate', todoByDate)
        Object.keys(todoByDate)?.forEach(todo => {

            renderAccordion(todoByDate[todo], todo)

            for (let k = 0; k < todoByDate[todo].length; k++) {
                if (!todoByDate[todo][k].sec) {
                    todoByDate[todo][k].sec = new Date().getTime();

                }

                console.log(todoByDate[todo][k])

                const newRow = document.createElement("tr");
                newRow.innerHTML = `
            <td>${todoByDate[todo][k].item}</td>
            <td>${todo}</td>
            <td>${todoByDate[todo][k].time}</td>
            <td><button  value='${k}${todo}' id='${k}${todo}' class="toggle-button btn ${todoByDate[todo][k].status ? "btn-danger" : "btn-success"}" toggle-id="${todoByDate[todo][k].sec}">${todoByDate[todo][k].status ? "Undone" : "Done" }</button></td>
            <td><button class="delete-button btn btn-outline-light" delete-id="${todoByDate[todo][k].sec}" value='${k}${todo}'><i class="deleteId-identifier fas fa-trash delete-button"></i></button></td>
            <td ><button class="id-identifier edit-button btn btn-outline-light" id="${todoByDate[todo][k].sec}"value='${k}${todo}'><i class=" fas fa-edit edit-button"></i></button></td>
            `;
                console.log(todoByDate[todo][k].sec)
                if (todoByDate[todo][k].status) {
                    newRow.classList.add("status");
                }
                // else{
                //     newRow.classList.remove("status");

                // }
                todoTable.querySelector("tbody").appendChild(newRow);

                console.log(editId)
            }


        });

        console.log(todoByDate)

        addClickEvents()

    }

    // Initial rendering
    renderTodos();




    function renderAccordion(temp, todoDate) {
        // console.log((editBtn))
        let acc = `<div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne${(todoDate)}">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseO${(todoDate)}" aria-expanded="false" aria-controls="flush-collapseO${(todoDate)}">
    ${todoDate}
    </button>
    </h2>
    `

        for (let k = 0; k < temp.length; k++) {

            acc += ` <div id="flush-collapseO${(todoDate)}" class="accordion-collapse collapse" aria-labelledby="flush-headingO${(todoDate)}${(todoDate)}" data-bs-parent="#accordionFlushExample">

     <div class="accordion-body"><p class="mb-0">${temp[k].item} - ${temp[k].time} (${temp[k].status ? "Complete" : "Incomplete"})</p></div>
     </div>`

        }
        document.getElementById("accordionFlushExample").innerHTML += (`${acc} </div>`);
    }

    



    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const todoText = todoInput.value;
        const todoDate = todoDatein.value;
        const todoTime = todoTimein.value;
        console.warn(todoByDate)
        // console.warn({text: todoText, date: todoDate, time: todoTime, done:false})
        // console.log(Object.keys(todoByDate),"Object",todoDate)
        if (Object.keys(todoByDate).includes(todoDate)) {
            todoByDate[todoDate].push({
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


        // Check if the todoText is not empty and is not already in the todoByDate array
        if (todoText && !Object.keys(todoByDate).includes(todo => todo.text === todoText)) {
            renderTodos();
            todoInput.value = "";
            todoDatein.value = "";
            todoTimein.value = "";


        } else if (todoByDate.some(todo => todo.text === todoText)) {}
        console.log(todoByDate)
        updateLocalStorage();
        addClickEvents();

    });
    function addClickEvents() {

        setTimeout(() => {
            console.warn('Parent')
            const editBtn = document.querySelectorAll('.edit-button');
                // console.log(editBtn, 120)
            // for (let e = 0; e < editBtn.length; e++) {
            //     editBtn[e].addEventListener("click", function(event) {
            //         const target = event.target;

            //         console.log(event.target)
            //         const editId = target.getAttribute("id");
            //         console.log(editId)
            //         let arrayDate = Object.keys(todoByDate);
            //         for (let i = 0; i < arrayDate.length; i++) {
            //             for (let j = 0; j < todoByDate[arrayDate[i]].length; j++) {
            //                 console.log(todoByDate[arrayDate[i]][j].sec)
            //                 if (editId == todoByDate[arrayDate[i]][j].sec) {
            //                     const todoText = todoByDate[arrayDate[i]][j].item;
            //                     const newText = prompt("Edit todo:", todoText);
            //                     todoByDate[arrayDate[i]][j].text = newText;
            //                 }
            //             }
            //         }

            //             // console.log(target)
            //             // const todoRow = target.parentElement.parentElement;
            //             // const todoTextCell = todoRow.children[0];
            //             // const todoText = todoTextCell.textContent;
            //             // const newText = prompt("Edit todo:", todoText);
            //             // const temp = target.value.split(''); // Split the value into [k, todoDate]
            //             // console.log(temp.slice(1).join(""))
            //             // let tem=temp[0];
            //             // if (newText && newText !== todoText) {
            //             //     todoByDate[temp.slice(1).join("")][Number(tem)].item = newText;
            //             //     todoTextCell.textContent = newText;
            //             //     const accordionItem = document.getElementById(`flush-headingOne${temp.slice(1).join("")}`);
            //             //     const accordionButton = accordionItem.querySelector("button");
            //             //     accordionButton.textContent = temp.slice(1).join("");
            //             //     const accordionBody = document.getElementById(`flush-collapseO${temp.slice(1).join("")}`);
            //             //     const accordionBodyContent = accordionBody.querySelector(".accordion-body");
            //             //     accordionBodyContent.innerHTML = `<p class="mb-0">${newText} - ${todoByDate[temp.slice(1).join("")][Number(tem)].time} (${todoByDate[temp.slice(1).join("")][Number(tem)].status ? "Complete" : "Incomplete"})</p>`;

            //             //     updateLocalStorage();
            //             // }
            //             // else{
            //             //     alert("The item already exists")
            //             // }
            //     });
            // }

        

            const deleteBtn = document.querySelectorAll('.delete-button')
                console.log('deleteBtn', deleteBtn)
            console.log(deleteBtn, 220)
            // for (let q = 0; q < deleteBtn.length; q++) {
            //     console.log('DEL', deleteBtn[q])
            //     deleteBtn[q].addEventListener("click", function(event) {
            //         const target = event.target;
            //         console.log('target', target)
            //         console.log('todoByDate', todoByDate)
            //         const deleteId = target.getAttribute("delete-id");
            //         console.log(deleteId)
            //         if (!deleteId) {
            //             return
            //         }
            //         let arrayDate = Object.keys(todoByDate);
            //         for (let i = 0; i < arrayDate.length; i++) {
            //             for (let j = 0; j < todoByDate[arrayDate[i]].length; j++) {
            //                 console.log(todoByDate[arrayDate[i]][j].sec)
            //                 if (deleteId == todoByDate[arrayDate[i]][j].sec) {
            //                     console.log('DEL match')
            //                     delete todoByDate[arrayDate[i]].splice(j, 1);
            //                     renderTodos();


            //                     updateLocalStorage();

            //                     // Object.keys(todoByDate)?.forEach(todo => {

            //                     //     renderAccordion(todoByDate[todo], todo)
            //                     //                     // renderAccordion();
            //                     // })
            //                     break

            //                 }
            //             }
            //         }
            //     });
            // };


            const toggleBtn = document.querySelectorAll('.toggle-button');
                console.log('Buttons', toggleBtn)
            console.log('ALL', todoByDate)

            // for (let q = 0; q < deleteBtn.length; q++) {
            //     console.log('DEL', toggleBtn[q])
            //     toggleBtn[q].addEventListener("click", function(event) {
            //         const target = event.target;
            //         console.log('target', target)
            //         console.log('todoByDate', todoByDate)
            //         const deleteId = target.getAttribute("delete-id");
            //         console.log(deleteId)
            //         if (!deleteId) {
            //             return
            //         }
            //         let arrayDate = Object.keys(todoByDate);
            //         for (let i = 0; i < arrayDate.length; i++) {
            //             for (let j = 0; j < todoByDate[arrayDate[i]].length; j++) {
            //                 console.log(todoByDate[arrayDate[i]][j].sec)
            //                 if (deleteId == todoByDate[arrayDate[i]][j].sec) {
            //                     console.log('DEL match')
            //                     // delete todoByDate[arrayDate[i]].splice(j, 1);
            //                     renderTodos();


            //                     updateLocalStorage();

            //                     // Object.keys(todoByDate)?.forEach(todo => {

            //                     //     renderAccordion(todoByDate[todo], todo)
            //                     //                     // renderAccordion();
            //                     // })
            //                     break

            //                 }
            //             }
            //         }
            //     });
            // };
            // console.log('ALL', todoByDate)


            // for (let t=0;t<toggleBtn.length;t++){
            //     toggleBtn[t].removeEventListener("click", function(event) {})
            // }



            for (let t=0;t<toggleBtn.length;t++){
                toggleBtn[t].addEventListener("click", function(event) {
                    console.log('event', event.target)
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
                                console.log('Match', todoByDate[arrayDate[i]][j].status)
                                todoByDate[arrayDate[i]][j].status = !todoByDate[arrayDate[i]][j].status;

                                updateLocalStorage();
                                // renderTodos();
                                break;

                            }
                        }
                    }
                });
            }

        }, 0)
    }


    // todoTable.addEventListener("click", function(event) {
    //     const target = event.target;

    //     if (target.classList.contains("toggle-button")) {
    //         const todoRow = target.closest("tr");
    //         const todoText = todoRow.querySelector("td:first-child");
    //         let temp4 = target.value + "";
    //         todoRow.classList.toggle("status");
    //         if (todoRow.classList.contains("status")) {
    //             todoText.classList.add("status");
    //             target.classList.remove("btn-success");
    //             target.classList.add("btn-danger");
    //             target.textContent = "Undone";

    //             todoByDate[temp4.slice(1)][Number(temp4[0])].status = true;
    //             console.log(todoByDate[temp4.slice(1)][Number(temp4[0])])

    //             console.log(todoByDate)

    //             updateLocalStorage();

    //         } else {
    //             todoText.classList.remove("status");
    //             target.classList.remove("btn-danger");
    //             target.classList.add("btn-success");
    //             target.textContent = "Done";

    //             todoByDate[temp4.slice(1)][Number(temp4[0])].status = false;


    //             console.log(todoByDate);
    //             updateLocalStorage();

    //         }

    //     }
    //     // renderTodos();
    // });




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
    updateLocalStorage();
    renderTodos();
    console.log(todoByDate)
});
