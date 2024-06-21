const buttonAdd = document.getElementById("btnAdd");
const buttonCancel = document.getElementById("btnCancel");
const inpNewTask = document.getElementById("inpNewTask");
const liste = document.getElementById("listTask");

let tabTasks = [];

function toggleHidden() {
  buttonAdd.hidden = !buttonAdd.hidden;
  buttonCancel.hidden = !buttonCancel.hidden;
  inpNewTask.hidden = !inpNewTask.hidden;
}

function getAllTasks() {
  fetch("http://localhost:3000/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      liste.innerHTML = "";
      tabTasks = data;
      convertTasksToLi();
    })
    .catch((err) => {
      console.log("Erreur avec GET");
    });
}

getAllTasks();

function convertTasksToLi() {
  for (const task of tabTasks) {
    // Construction de LI
    const newLi = document.createElement("li");
    newLi.className = "list-group-item";

    // Construction de CHECKBOX
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.checked = task.checked;
    newCheckBox.style.margin = "0 10px";
    newCheckBox.addEventListener("change", () => {
      fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          checked: newCheckBox.checked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          getAllTasks();
        })
        .catch((err) => {
          console.log("Erreur avec PATCH");
        });
    });

    // Construction de SPAN TITLE
    const spanTitle = document.createElement("span");
    spanTitle.textContent = task.text;
    spanTitle.style.margin = "0 20px";

    // Construction de SPAN BADGE
    const spanBadge = document.createElement("span");
    spanBadge.classList.add("badge");
    spanBadge.classList.add("text-bg-secondary");
    let hours = new Date(task.date).getHours();
    let minutes = new Date(task.date).getMinutes();
    spanBadge.textContent = `${hours}H${minutes}`;

    newLi.appendChild(newCheckBox);
    newLi.appendChild(spanTitle);
    newLi.appendChild(spanBadge);
    newLi.addEventListener("dblclick", () => {
      if (confirm("Etes vous sur de vouloir supprimer cette tâche ?") == true) {
        fetch(`http://localhost:3000/tasks/${task.id}`, {
          method: "DELETE",
        })
          .then(function thomas(res) {
            alert("Task deleted !");
            getAllTasks();
          })
          .catch((err) => {
            console.log("Erreur avec DELETE");
          });
      }
    });
    liste.appendChild(newLi);
  }
}

buttonAdd.addEventListener("click", () => {
  toggleHidden();
});
buttonCancel.addEventListener("click", () => {
  toggleHidden();
});
inpNewTask.addEventListener("change", () => {
  let newTaskObject = {
    text: inpNewTask.value,
    checked: false,
    date: new Date(),
  };
  fetch("http://localhost:3000/tasks", {
    method: "POST",
    body: JSON.stringify(newTaskObject),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      alert("Task Successsfully added");
    })
    .catch((err) => {
      console.log("Erreur avec POST");
    });
  toggleHidden();
});
