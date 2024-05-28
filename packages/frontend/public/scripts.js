let tasks = [];

const $tbody = document.getElementById("table-body");
const $new = document.getElementById("new");
const $all = document.getElementById("all-items");

function render() {
  $tbody.innerHTML = "";

  tasks.forEach((task) => {
    const $row = document.createElement("tr");
    $row.className = "table-row";

    const $checkbox = document.createElement("input");
    $checkbox.type = "checkbox";
    $checkbox.checked = task.selected;

    const $input = document.createElement("input");
    $input.className = "input";
    $input.type = "text";

    const $cell1 = document.createElement("td");
    $cell1.className = "table-data";
    $cell1.appendChild($checkbox);
    $row.appendChild($cell1);

    const $cell2 = document.createElement("td");
    $cell2.className = "table-data";
    $cell2.setAttribute("data-id", task.id);

    if (task.editable) {
      $input.value = task.title;
      $cell2.appendChild($input);
    } else {
      $cell2.textContent = task.title;
    }

    $row.appendChild($cell2);

    $tbody.appendChild($row);

    $checkbox.addEventListener("change", () => handleOnCheckboxChange($cell2));

    $cell2.addEventListener("click", (event) =>
      handleOnCellClick($checkbox, event),
    );

    $input.focus();

    $input.addEventListener("blur", (event) =>
      handleOnInputBlur($cell2, event),
    );

    $input.addEventListener("keydown", (event) =>
      handleOnInputKeyDown($input, event),
    );
  });

  const $header = document.getElementById("table-header-title");
  const selected = tasks.filter((task) => task.selected).length;
  if (selected) {
    $header.innerHTML = "";
    const $complete = document.createElement("button");
    $complete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Completar`;
    $complete.className = "button button-small inline-flex ml-2";
    $header.appendChild(
      document.createTextNode(
        `${selected} elemento${selected > 1 ? "s" : ""} seleccionado${selected > 1 ? "s" : ""}`,
      ),
    );
    $header.appendChild($complete);

    if (selected === tasks.length) {
      $all.checked = true;
    }

    $complete.addEventListener("click", handleOnCompleteClick);
  } else {
    $header.textContent = "Título";
    $all.checked = false;
  }
}

$new.addEventListener("click", handleOnNewClick);

$all.addEventListener("change", handleOnAllChange);

function handleOnCheckboxChange($cell2) {
  const id = $cell2.getAttribute("data-id");
  const taskIndex = tasks.findIndex((tsk) => tsk.id === id);
  tasks[taskIndex].selected = !tasks[taskIndex].selected;
  render();
}

function handleOnCellClick($checkbox, event) {
  const id = event.target.getAttribute("data-id");
  const taskIndex = tasks.findIndex((tsk) => tsk.id === id);
  tasks[taskIndex].editable = true;
  $checkbox.innerHTML = "";
  render();
}

function handleOnInputBlur($cell2, event) {
  const value = event.target.value;
  if (value === "") {
    tasks.pop();
    render();
  } else {
    const id = $cell2.getAttribute("data-id");
    const taskIndex = tasks.findIndex((tsk) => tsk.id === id);
    const task = tasks[taskIndex];
    task.title = value;

    if (task.new) {
      addTodo(task).then((response) => {
        if (response.ok) {
          task.editable = false;
          task.new = false;
          render();
        }
      });
    } else {
      updateTodo(task).then((response) => {
        if (response.ok) {
          task.editable = false;
          task.new = false;
          render();
        }
      });
    }
  }
}

function handleOnInputKeyDown($input, event) {
  const value = event.target.value;

  if (event.key === "Enter") {
    $input.blur();
  } else if (event.key === "Escape") {
    if (value === "") {
      $input.blur();
    } else {
      tasks[tasks.length - 1].title = value;
    }

    render();
  }
}

function handleOnNewClick() {
  tasks.push({
    id: Date.now().toString(),
    title: "",
    editable: true,
    new: true,
  });
  render();
}

function handleOnAllChange(event) {
  tasks.map((task) => {
    task.selected = event.target.checked;
  });
  render();
}

function handleOnCompleteClick() {
  const ids = tasks.filter((task) => task.selected).map((task) => task.id);
  completeTodos(ids).then((response) => {
    if (response.ok) {
      getTodos().then((data) => {
        tasks = data;
        render();
      });
    }
  });
}

async function getTodos() {
  return fetch("http://localhost:4000/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

async function updateTodo(task) {
  return fetch(`http://localhost:4000/todos/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

async function completeTodos(ids) {
  return fetch("http://localhost:4000/todos/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });
}

async function addTodo(task) {
  return fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

getTodos().then((data) => {
  tasks = data;
  render();
});
