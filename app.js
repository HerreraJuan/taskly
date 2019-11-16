//Inicializar event listeners
var listaTareas = document.querySelector('.tareas').children[1];
listaTareas.onclick = modificarTarea;
listaTareas.ondblclick = eliminarTarea;
document.querySelector('form').onsubmit = agregarTarea;

mostrarTareas();
contarTareas();

function contarTareas(){
  //Obtiene tareas totales y completas
  let totalTareas = listaTareas.children.length;
  let tareasCompletas = document.querySelectorAll(".completa").length;

  //Agrega un contador con las tareas completas/totales.
  document.getElementById('conteo-tareas').innerText =  `${tareasCompletas}\\${totalTareas}`
}

function agregarTarea(){
  let textoTarea = document.getElementById('nueva-tarea');

  //No hace nada si el input está vacio
  if (!textoTarea.value) {
    return;
  }

  let tarea = document.createElement('li');
  let spanTarea = document.createElement('span');
  let spanEliminar = document.createElement('span');

  spanTarea.innerText = textoTarea.value;
  spanTarea.classList.add("incompleta");
  spanEliminar.innerText = 'x';

  tarea.appendChild(spanTarea);
  tarea.appendChild(spanEliminar);
  listaTareas.appendChild(tarea);

  agregarTareaLocalStorage(textoTarea.value);
  textoTarea.value = "";

  contarTareas();
}

function agregarTareaLocalStorage(tarea){
  let tareas = obtenerTareasLocalStorage();
  tareas.push(tarea);
  localStorage.setItem('tareas', JSON.stringify(tareas));
}
function obtenerTareasLocalStorage(){
  let tareas;

  if(localStorage.getItem('tareas') === null){
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }
  return tareas;
}

function eliminarTarea(e){
  e.target.parentElement.remove();
  if(e.type == "dblclick"){
    eliminarTareaLocalStorage(e.target.innerText);
  } else {
    eliminarTareaLocalStorage(e.target.previousElementSibling.innerText);
  }
  contarTareas();
}

function modificarTarea(e){
  let elemento = e.target;
  let clase = elemento.classList;

  if(clase[0] == "incompleta"){
    clase.remove("incompleta");
    clase.add("completa");
  }else if(clase[0] == "completa") {
    clase.remove("completa");
    clase.add("incompleta");
  }

  if(elemento.innerText == "x"){
    eliminarTarea(e);
  }
  contarTareas();
}

function mostrarTareas(){
  obtenerTareasLocalStorage().forEach(textoTarea => {
    let tarea = document.createElement('li');
    let spanTarea = document.createElement('span');
    let spanEliminar = document.createElement('span');

    spanTarea.innerText = textoTarea;
    spanTarea.classList.add("incompleta");
    spanEliminar.innerText = 'x';

    tarea.appendChild(spanTarea);
    tarea.appendChild(spanEliminar);
    listaTareas.appendChild(tarea);
    contarTareas();
  });
}
function eliminarTareaLocalStorage(tareaBorrar){
  let tareas = obtenerTareasLocalStorage();
  tareas.forEach(function(tarea, index){
    if(tareaBorrar === tarea){
      tareas.splice(index,1);
    }
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
