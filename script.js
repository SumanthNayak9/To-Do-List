var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var items = document.querySelectorAll("li");
var editInput = document.createElement("input");
var Time = document.getElementById("Time");

function inputLength() {
  return input.value.length;
}

// new list items
function createListElement() {
  
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value + ` ${Time.value}`));
  //creates buttons
  Time.value='';
  var btn1 = document.createElement("button");
  var btn2 = document.createElement("button");
  var btn3 = document.createElement("button");

  btn1.innerHTML = "Done";
  btn2.innerHTML = "Delete";
  btn3.innerHTML = "Edit";



  btn1.id="Btn1";
  btn2.id="Btn2";
  btn3.id="Btn3";

  li.appendChild(btn1);
  li.appendChild(btn2);
  li.appendChild(btn3);


  // removes element
  btn2.addEventListener("click", function () {
    li.parentNode.removeChild(li);
  });

  btn1.addEventListener("click", function () {
    li.classList.toggle("done");
    console.log(btn1)
    if(btn1.innerText == "Done"){
      btn1.innerText = "Undone";
      document.getElementById("Btn1").style.backgroundColor="green";
      document.getElementById("Btn2").style.backgroundColor="green";
      document.getElementById("Btn3").style.backgroundColor="green";

    }
    else //if(btn1.innerText == "Undone")
    {
      btn1.innerText = "Done";
      document.getElementById("Btn1").style.backgroundColor="red";
      document.getElementById("Btn2").style.backgroundColor="red";
      document.getElementById("Btn3").style.backgroundColor="red";

    }

    
  });

  btn3.addEventListener("click", function() {
    var listItem = this.parentNode;
    var editInput=listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");

    if(containsClass){
      label.innerText=editInput.value;
    }
    else{
      editInput.value=label.innerText;
    }
    listItem.classList.toggle("editMode");
  });

  ul.appendChild(li);
  input.value = "";
}


function addListAfterClick() {
  if (inputLength() > 0 && Time.value) {
    createListElement();
    console.log(Time.value)
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && Time.value && eventKey === "Enter") {
    createListElement();
  }
}

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

