let globalTasks = ["Matematicas", "Lavar louça", "Banho nos cachorros"];
let inputTask = null;
let currentInput = null;
let isEditing = false;

// Inicializacion
window.addEventListener("load", () => {
  inputTask = document.querySelector("#inputTask");

  preventFormSubmit();
  activateInput();
  render();
});

//Previene que pagina recargue al subir valor
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}
// Ingreso de una nueva tarea
function activateInput() {
  function insertTask(newTask) {
    globalTasks = [...globalTasks, newTask];
  }
  // permite editar una tarea
  function updateTask(newTask) {
    globalTasks[currentIndex] = newTask;
  }
  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== "";
    if (!hasText) {
      clearInput();
      return;
    }
    if (event.key === "Enter") {
      if (isEditing) {
        updateTask(event.target.value);
      } else {
        insertTask(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }
  inputTask.focus();
  inputTask.addEventListener("keyup", handleTyping);
}

function render() {
  //crea boton para eliminar tarea
  function createDeleteButton(index) {
    function deleteTask() {
      globalTasks = globalTasks.filter((_, i) => i !== index);
      render();
    }
    var button = document.createElement("button");
    button.classList.add("deleteButon");
    button.textContent = "X";
    button.addEventListener("click", deleteTask);
    return button;
  }
  //anade tarea y permite su edicion
  function createSpan(task, index) {
    function editItem() {
      inputTask.value = task;
      inputTask.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = task;
    span.addEventListener("click", editItem);
    return span;
  }
  //crea y agrega los documentos a una lista dentro de una div
  var divTasks = document.querySelector("#tasks");
  divTasks.innerHTML = "";

  var ul = document.createElement("ul");

  for (var i = 0; i < globalTasks.length; i++) {
    var currentTask = globalTasks[i];

    var li = document.createElement("li");
    var button = createDeleteButton(i);
    var span = createSpan(currentTask, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divTasks.appendChild(ul);
  clearInput();
}

//limpia el cuadro ingreso de texto
const clearInput = () => {
  inputTask.value = " ";
  inputTask.focus();
};
