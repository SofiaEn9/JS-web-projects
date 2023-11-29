let todoForm = document.querySelector("#todoForm");
let todoInput = document.querySelector("#todoInput");
let ul = document.querySelector("#todoList");

function createListElement(event) {
  event.preventDefault();
  if (todoInput.value.length > 0) {
    let li = document.createElement("li");
    li.setAttribute("class", "col-7");
    li.append(document.createTextNode(todoInput.value));
    ul.appendChild(li);
    todoInput.value = "";

    let doneButton = document.createElement("button");
    doneButton.setAttribute("class", "col-2");
    doneButton.setAttribute("id", "done");
    doneButton.appendChild(document.createTextNode("Done"));
    ul.appendChild(doneButton);
    doneButton.addEventListener("click", function () {
      li.classList.toggle("done");
    });

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "col-2");
    deleteButton.setAttribute("id", "delete");
    deleteButton.appendChild(document.createTextNode("Delete"));
    ul.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
      li.remove();
      doneButton.remove();
      deleteButton.remove();
    });
  }
}

todoForm.addEventListener("submit", createListElement);
