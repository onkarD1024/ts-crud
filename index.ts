/**
 * * declare variable like this const a: string | number | boolean | any | void | interface (like TODO)
 * * In JavaScript, the fundamental way that we group and pass around data is through objects. In TypeScript, we represent those through object types/interface.
 * * should mention funntion return type like this function fetchToDos(): void;
 */
document.addEventListener("DOMContentLoaded", () => {
  fetchToDos();
});
interface TODO {
  id: number;
  name: any;
}

function fetchToDos(): void {
  const todos: TODO[] = JSON.parse(sessionStorage.getItem("todos"));
  const listDiv = document.querySelectorAll<HTMLElement>(".od-todo__list");
  if (todos.length) {
    listDiv[0].style.display = "block";
    const tbody: HTMLInputElement = <HTMLInputElement>(
      document.getElementById("od-todo-table__body")
    );
    let html: string = "";
    for (let i = 0; i < todos.length; i++) {
      html += "<tr>";
      html += `<td>${todos[i].name}</td>`;
      html += `<td><button data-todoid=${todos[i].id} data-todoname='${todos[i].name}' onclick='editToDo(event)'>Edit</button></td>`;
      html += `<td><button data-todoid=${todos[i].id} onclick='deleteToDo(event)'>Delete</button></td>`;
      html += "</tr>";
    }
    tbody.innerHTML = html;
  } else if (listDiv) {
    listDiv[0].style.display = "none";
  }
}

function addToDo(event): void {
  event.preventDefault();
  const inputElement: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("todo-input")
  );
  if (!inputElement.value.trim()) {
    alert("Empty value not allowed");
    return;
  }
  const newToDo: TODO = {
    id: Math.random(),
    name: inputElement.value,
  };
  inputElement.value = "";
  const todos: any[] = JSON.parse(sessionStorage.getItem("todos")) || [];
  todos.push(newToDo);
  sessionStorage.setItem("todos", JSON.stringify(todos));
  fetchToDos();
}

function editToDo(event): void {
  const oldToDoId: number = Number(event.target.getAttribute("data-todoid"));
  const oldToDoName = event.target.getAttribute("data-todoname");
  let updatedToDoName = prompt("Enter ToDo", oldToDoName);
  if (updatedToDoName) {
    const todos: any[] = JSON.parse(sessionStorage.getItem("todos")) || [];
    const newToDos: any[] = todos.map((todo) => {
      if (todo.id === oldToDoId) {
        return { ...todo, name: updatedToDoName };
      }
      return todo;
    });
    sessionStorage.setItem("todos", JSON.stringify(newToDos));
    fetchToDos();
  }
}

function deleteToDo(event): void {
  const currentToDoId: number = Number(
    event.target.getAttribute("data-todoid")
  );
  const todos: any[] = JSON.parse(sessionStorage.getItem("todos")) || [];
  const newToDos = todos.filter((todo) => todo.id !== currentToDoId);
  sessionStorage.setItem("todos", JSON.stringify(newToDos));
  fetchToDos();
}
