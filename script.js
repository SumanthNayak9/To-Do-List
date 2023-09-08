// let todoByDate = {};
document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo");
    const todoDatein = document.getElementById("Date");
    const todoTimein = document.getElementById("Time");
    const todoTable = document.getElementById("todo-table");
    const sortButton = document.getElementById("sort-button");
    let todoByDate = JSON.parse(localStorage.getItem("todos"))||{} ;
    const editBtn = document.getElementsByClassName("id-identifier");
    console.log(todoByDate)
    console.log(editBtn)
    let sortAsc = true;
    function vg(){
        let temp = {}
        for(let y=0;y<todoByDate.length;y++){



            if(Object.keys(temp).includes(todoByDate[y].date)){
                temp[todoByDate[y].date].push({"item":todoByDate[y].text,"time":todoByDate[y].time,"status":'done'});
            }
            else{
                temp[todoByDate[y].date]=[{"item":todoByDate[y].text,"time":todoByDate[y].time,"status":'done'}];
            }

    } 
    console.log(temp)
    todoByDate= temp;
    }

    function updateLocalStorage() {


                console.warn(1, todoByDate)

        localStorage.setItem("todos", JSON.stringify(todoByDate));
    }





    // Function to render todos
    function renderTodos() {
         document.getElementById("accordionFlushExample").innerHTML="";
        todoTable.querySelector("tbody").innerHTML = "";
        console.warn('todoByDate', todoByDate)
        Object.keys(todoByDate)?.forEach(todo => {

            renderAccordion(todoByDate[todo],todo)

            for(let k=0;k<todoByDate[todo].length;k++){
                if(!todoByDate[todo][k].sec){
                    todoByDate[todo][k].sec=new Date().getTime();

                }
                        console.log(todoByDate[todo][k])
            
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td id="${9}">${todoByDate[todo][k].item}</td>
                <td>${todo}</td>
                <td>${todoByDate[todo][k].time}</td>
                <td><button  value='${k}${todo}' id='${k}${todo}' class="toggle-button btn ${todoByDate[todo][k].status ? "btn-danger" : "btn-success"}">${todoByDate[todo][k].status ? "Undone" : "Done"}</button></td>
                <td><button class="delete-button btn btn-outline-light" value='${k}${todo}'><i class="fas fa-trash delete-button"></i></button></td>
                <td ><button class="id-identifier edit-button btn btn-outline-light"id="${todoByDate[todo][k].sec}"value='${k}${todo}'><i class="fas fa-edit edit-button"></i></button></td>
            `;
            console.log(todoByDate[todo][k].sec)
            if (todoByDate[todo][k].status) {
                newRow.classList.add("status");
            }
            else{
                newRow.classList.remove("status");

            }
            todoTable.querySelector("tbody").appendChild(newRow);
            }
    
        });

        console.log(todoByDate)
         for(let i=0;i<editBtn.length;i++){
            target=event.target
        editBtn[i].addEventListener("click", function(event){
            const todoRow = target.closest("tr");
            const todoTextCell = todoRow.querySelector("td:first-child");
            const todoText = todoTextCell.textContent;
            const newText = prompt("Edit todo:", todoText);
                    console.log(event)
        });
    }
    }

    // Initial rendering
    renderTodos();



    function renderAccordion(temp,todoDate) {

console.log((todoDate))
        let acc=`<div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne${(todoDate)}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseO${(todoDate)}" aria-expanded="false" aria-controls="flush-collapseO${(todoDate)}">
                      ${todoDate}
                    </button>
                  </h2>
                `

        for(let k=0;k<temp.length;k++){

           acc+= ` <div id="flush-collapseO${(todoDate)}" class="accordion-collapse collapse" aria-labelledby="flush-headingO${(todoDate)}${(todoDate)}" data-bs-parent="#accordionFlushExample">

                    <div class="accordion-body"><p class="mb-0">${temp[k].item} - ${temp[k].time} (${temp[k].status ? "Complete" : "Incomplete"})</p></div>
                  </div>`

        }
    document.getElementById("accordionFlushExample").innerHTML+=(`${acc} </div>`);


}


    todoForm.addEventListener("submit", function(event){
        event.preventDefault();

        const todoText = todoInput.value;
        const todoDate = todoDatein.value;
        const todoTime = todoTimein.value;
        console.warn(todoByDate)
        // console.warn({text: todoText, date: todoDate, time: todoTime, done:false})
// console.log(Object.keys(todoByDate),"Object",todoDate)
        if(Object.keys(todoByDate).includes(todoDate)){
            todoByDate[todoDate].push({"item":todoText,"time":todoTime,"status":false});
        }
        else{
            todoByDate[todoDate]=[{"item":todoText,"time":todoTime,"status":false}]
        }
        console.warn('Add todoByDate', todoByDate)


        // Check if the todoText is not empty and is not already in the todoByDate array
        if (todoText && !Object.keys(todoByDate).includes(todo => todo.text === todoText)){
            renderTodos();
            todoInput.value = "";
            todoDatein.value = "";
            todoTimein.value = "";
            

        }
        else if (todoByDate.some(todo => todo.text === todoText)) {
        }
        console.log(todoByDate)
                    updateLocalStorage();

    });

    todoTable.addEventListener("click", function(event) {
        const target= event.target;
console.log(target.value)
        if (target.classList.contains("delete-button")) {
            const todoRow = target.closest("tr");
            let temp2 = target.value+"";
            console.log(temp2[0],temp2.slice(1))
            todoByDate[temp2.slice(1)].splice(Number(temp2[0]),1);
            if(!todoByDate[temp2.slice(1)].length){
                delete todoByDate[[temp2.slice(1)]];
            }
            todoRow.remove();
            renderTodos();
        }
        // else if (target.classList.contains("edit-button")) {
        //     const todoRow = target.closest("tr");
        //     const todoTextCell = todoRow.querySelector("td:first-child");
        //     const todoText = todoTextCell.textContent;
        //     const newText = prompt("Edit todo:", todoText);
        //     console.log(todoRow,'todoRow')
        //     console.log(todoTextCell,'todoTextCell')
        //     console.log(todoText,'todoText')
        //     console.log(newText)
            

        //     let temp3 = target.value+"";
        //     console.log(temp3,event)
        //     console.log((temp3[0]),'newText')
        //     console.log(todoText,'todoText')
        //     if (newText && newText !== todoText) {
        //         todoByDate[temp3.slice(1)][Number(temp3[0])].item=newText;
        //         todoTextCell.textContent = newText;
        //         renderTodos();
        //         updateLocalStorage();
        //         // if (todoByDate[todoRowId]) {
        //         //     todoByDate[todoRowId].item = newText;
        //         //     todoTextCell.textContent = newText;
        //         //     todoTextCell.textContent = newText;
        //         //     renderTodos();
        //         //     updateLocalStorage();
        //         // }
        //         // else {
        //         //     todoByDate[todoRowId].item = newText;
        //         //     todoTextCell.textContent = newText;
        //         //     todoTextCell.textContent = newText;                }
        //     }

        //     else {
        //         alert("Item already exists");
        //     }

        //     // updateLocalStorage();
        //     // renderTodos();
        // }
        updateLocalStorage();



    });

    todoTable.addEventListener("click", function(event) {
        const target = event.target;

        if (target.classList.contains("toggle-button")) {
            const todoRow = target.closest("tr");
            const todoText = todoRow.querySelector("td:first-child");
            let temp4 = target.value+"";
            todoRow.classList.toggle("status");
            if (todoRow.classList.contains("status")) {
                todoText.classList.add("status");
                target.classList.remove("btn-success");
                target.classList.add("btn-danger");
                target.textContent = "Undone";

                todoByDate[temp4.slice(1)][Number(temp4[0])].status=true;
                console.log(todoByDate[temp4.slice(1)][Number(temp4[0])])

                console.log(todoByDate)

                updateLocalStorage();

            } else {
                todoText.classList.remove("status");
                target.classList.remove("btn-danger");
                target.classList.add("btn-success");
                target.textContent = "Done";

                todoByDate[temp4.slice(1)][Number(temp4[0])].status=false;

                 
                 console.log(todoByDate);
                updateLocalStorage();

            }
           
        }
        // renderTodos();
    });

 
    sortButton.addEventListener("click", function() {
        const rows = Array.from(todoTable.querySelectorAll("tbody tr"));
        const doneRows = rows.filter(row => row.classList.contains("status"));
        const undoneRows = rows.filter(row => !row.classList.contains("status"));

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
    console.log(todoByDate)
});
