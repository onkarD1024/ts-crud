var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * * declare variable like this const a: string | number | boolean | any | void | interface (like TODO)
 * * In JavaScript, the fundamental way that we group and pass around data is through objects. In TypeScript, we represent those through object types/interface.
 * * should mention funntion return type like this function fetchToDos(): void;
 */
document.addEventListener("DOMContentLoaded", function () {
    fetchToDos();
});
function fetchToDos() {
    var todos = JSON.parse(sessionStorage.getItem("todos"));
    var listDiv = document.querySelectorAll(".od-todo__list");
    if (todos.length) {
        listDiv[0].style.display = "block";
        var tbody = (document.getElementById("od-todo-table__body"));
        var html = "";
        for (var i = 0; i < todos.length; i++) {
            html += "<tr>";
            html += "<td>".concat(todos[i].name, "</td>");
            html += "<td><button data-todoid=".concat(todos[i].id, " data-todoname='").concat(todos[i].name, "' onclick='editToDo(event)'>Edit</button></td>");
            html += "<td><button data-todoid=".concat(todos[i].id, " onclick='deleteToDo(event)'>Delete</button></td>");
            html += "</tr>";
        }
        tbody.innerHTML = html;
    }
    else if (listDiv) {
        listDiv[0].style.display = "none";
    }
}
function addToDo(event) {
    event.preventDefault();
    var inputElement = (document.getElementById("todo-input"));
    if (!inputElement.value.trim()) {
        alert("Empty value not allowed");
        return;
    }
    var newToDo = {
        id: Math.random(),
        name: inputElement.value
    };
    inputElement.value = "";
    var todos = JSON.parse(sessionStorage.getItem("todos")) || [];
    todos.push(newToDo);
    sessionStorage.setItem("todos", JSON.stringify(todos));
    fetchToDos();
}
function editToDo(event) {
    var oldToDoId = Number(event.target.getAttribute("data-todoid"));
    var oldToDoName = event.target.getAttribute("data-todoname");
    var updatedToDoName = prompt("Enter ToDo", oldToDoName);
    if (updatedToDoName) {
        var todos = JSON.parse(sessionStorage.getItem("todos")) || [];
        var newToDos = todos.map(function (todo) {
            if (todo.id === oldToDoId) {
                return __assign(__assign({}, todo), { name: updatedToDoName });
            }
            return todo;
        });
        sessionStorage.setItem("todos", JSON.stringify(newToDos));
        fetchToDos();
    }
}
function deleteToDo(event) {
    var currentToDoId = Number(event.target.getAttribute("data-todoid"));
    var todos = JSON.parse(sessionStorage.getItem("todos")) || [];
    var newToDos = todos.filter(function (todo) { return todo.id !== currentToDoId; });
    sessionStorage.setItem("todos", JSON.stringify(newToDos));
    fetchToDos();
}
