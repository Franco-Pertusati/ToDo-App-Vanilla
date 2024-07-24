const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");

document.addEventListener("DOMContentLoaded", function () {
  const defaultTodos = [
    {
      todoName: "Leer ToDos",
      id: 0,
      completed: false,
    },
    {
      todoName: "Borrar un ToDo",
      id: 1,
      completed: false,
    },
    {
      todoName: "Editar un ToDo",
      id: 2,
      completed: false,
    },
    {
      todoName: "Crear un ToDo",
      id: 3,
      completed: false,
    },
    {
      todoName: "Apretar F5",
      id: 4,
      completed: false,
    },
    {
      todoName: "Filtrar ToDos",
      id: 5,
      completed: false,
    },
  ];

  if (localStorage.getItem("todos")) {
    loadData();
    printTodoList();
  } else {
    todos = defaultTodos;
    printTodoList();
  }
});

var todos = [];

updateCounters();

document.getElementById("createTodoBtn").addEventListener("click", function () {
  createTodo();
});

function printTodoList() {
  todos.forEach((todo) => {
    printTodo(todo);
  });
}

function createTodo() {
  const newTodoName = document.getElementById("newTodoInput");
  if (newTodoName.value != "") {
    const newTodo = {
      todoName: newTodoName.value,
      id: todos.length,
      completed: false,
    };
    todos.push(newTodo);
    printTodo(newTodo);
  }
  newTodoName.value = "";
  updateCounters();
  saveData(todos);
}

function deleteTodo(id) {
  todoTodelete = todos.find((todo) => todo.id == id);
  htmlTodo = document.getElementById(id + todoTodelete.todoName);
  htmlTodo.remove();
  todos.splice(id, 1);
  saveData(todos);
  updateCounters();
}

function printTodo(todo) {
  // Crear el elemento <div> con la clase "card" y "shadow"
  var divCard = document.createElement("div");
  divCard.id = todo.id + todo.todoName;
  divCard.classList.add("card", "shadow");
  if (todo.completed) {
    divCard.classList.add("completed");
  }

  // Crear el elemento <p> para el contenido del card
  var pContent = document.createElement("p");
  pContent.textContent = todo.todoName;
  divCard.appendChild(pContent);

  // Crear el input para el contenedor del card
  var input = document.createElement("input");
  input.placeholder = "Edit todo";
  input.classList.add("hide");
  divCard.appendChild(input);
  input.addEventListener("change", function () {
    todo.todoName = input.value;
    pContent.textContent = todo.todoName;
    input.classList.add("hide");
    divCard.id = todo.id + input.value
  });

  // Crear el contenedor <div> interno
  var divInner = document.createElement("div");

  // Crear el primer <span> con el icono de ion-icon dentro del contenedor interno
  var spanIcon1 = document.createElement("span");
  var icon1 = document.createElement("ion-icon");
  icon1.setAttribute("name", "create-outline");
  spanIcon1.appendChild(icon1);
  divInner.appendChild(spanIcon1);
  //Funcionalidad de editar para el boton
  spanIcon1.addEventListener("click", function () {
    input.value = "";
    input.classList.toggle("hide");
  });

  // Crear el segundo <span> con otro icono de ion-icon dentro del contenedor interno
  var spanIcon2 = document.createElement("span");
  var icon2 = document.createElement("ion-icon");
  icon2.setAttribute("name", "trash-outline");
  spanIcon2.appendChild(icon2);
  divInner.appendChild(spanIcon2);
  spanIcon2.addEventListener("click", function () {
    deleteTodo(todo.id);
  });

  // Agregar el contenedor interno al div principal
  divCard.appendChild(divInner);

  // Crear el elemento <button> con el icono de ion-icon
  var buttonIcon = document.createElement("button");
  buttonIcon.id = todo.id;
  var icon3 = document.createElement("ion-icon");
  if (!todo.completed) {
    icon3.setAttribute("name", "square-outline");
  } else {
    icon3.setAttribute("name", "checkBox-outline");
  }
  buttonIcon.appendChild(icon3);
  divCard.appendChild(buttonIcon);

  if (!todo.completed) {
    todoList.appendChild(divCard);
  } else {
    doneList.appendChild(divCard);
  }

  //Llamar a la funcion para cambiar el estado del todo
  buttonIcon.addEventListener("click", function () {
    changeTodoState(buttonIcon.id);
  });
}

function changeTodoState(id) {
  todoToInvert = todos.find((todo) => todo.id == id);
  todoToInvert.completed = !todoToInvert.completed;
  //Ahora nos encargamos de mover el todo de lista en el HTML
  htmlTodo = document.getElementById(id + todoToInvert.todoName);
  htmlTodo.remove();
  printTodo(todoToInvert);
  updateCounters();
  saveData();
  console.log(todos);
}

function updateCounters() {
  var todoCount = document.getElementById("todoCount");
  var leftTodos = todos.filter((todo) => !todo.completed);
  if (leftTodos.length == 1) {
    message = leftTodos.length + " task left";
  } else {
    message = leftTodos.length + " tasks left";
  }
  todoCount.textContent = message;
}

//Barra de busqueda
const input = document.getElementById("searchInput");
input.addEventListener("keyup", function () {
  todosResult = todos.filter((todos) =>
    todos.todoName.toLowerCase().includes(input.value)
  );
  console.log(todosResult);
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  todosResult.forEach((todo) => {
    printTodo(todo);
  });
});

function saveData() {
  const stringifiedTodos = JSON.stringify(todos);
  localStorage.setItem("todos", stringifiedTodos);
}

function loadData() {
  var localStorageTodos = localStorage.getItem("todos");
  var parsedTodos = JSON.parse(localStorageTodos);
  todos = parsedTodos;
}
