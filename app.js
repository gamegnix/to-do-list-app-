let todoInput = document.querySelector("#todo-input");

let addBtn = document.querySelector("#add-btn");

let todoList = document.querySelector("#todo-list");

let counter = document.querySelector("#counter");

let date = document.querySelector("#date");

let filterBtns = document.querySelectorAll(".filter-btn")

let todos = [];

let currentFilter = "all"

let today = new Date();
date.textContent = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

addBtn.addEventListener("click", () => {
  let todoText = todoInput.value;
  if (todoText === "") {
    return;
  }
  todos.push({ text: todoText, completed: false });
  todoInput.value = "";
  renderTodos();
});

function renderTodos() {
  saveTodos();
  let activeTodos = todos.filter((t) => !t.completed)
  counter.textContent =`${activeTodos.length} tasks remaining`
  todoList.innerHTML = "";

  let filteredTodos = todos
  
  if(currentFilter === "active") {
    filteredTodos = todos.filter((t) => !t.completed)
  } else if (currentFilter === "completed") {
      filteredTodos = todos.filter((t) => t.completed)
  }

  filteredTodos.forEach((todo) => {
    let li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) {
      li.classList.add("completed");
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t !== todo);
      renderTodos();
    });
    li.appendChild(deleteBtn);

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "Done";
    completeBtn.classList.add("completeBtn")
    completeBtn.addEventListener("click", () => {
      todo.completed = !todo.completed;
      renderTodos();
    });

    li.appendChild(completeBtn);

    todoList.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

filterBtns.forEach((btn) => {
   btn.addEventListener("click", () => {
    currentFilter = btn.textContent.toLowerCase()
    renderTodos()
   })
})

let savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  todos = JSON.parse(savedTodos);
  renderTodos();
}
