import Task from "../models/task.js";

import Service from "../services/Service.js";

let service = new Service();
let result = [];
let listTask = [];
// let taskList = new taskList();
init();
async function init() {
  try {
    result = await service.getTask();
    // console.log(result.data);
    rendertaskList(result.data);
    listTask = result.data;
  } catch (error) {
    console.log(error);
  }
}

async function rendertaskList(taskList) {
  const arrayDone = [];
  const arrayNY = [];
  taskList.forEach((item) => {
    item.status == "not yet" ? arrayNY.push(item) : arrayDone.push(item);
  });

  const toDoHtml = arrayNY.reduce((result, current) => {
    return (
      result +
      `
                                <li style="opacity: 0.5">
                                            <span>${current.name}</span>
                                            <span>
                                            <i
                                                class="fa fa-trash-alt"
                                                style="font-size: 15px; opacity: 0.6" id="${current.id}"
                                            ></i>
                                            <i class="fa fa-check-circle" id="${current.id}"></i>
                                            </span>
                                </li>
                `
    );
  }, "");
  const completehtml = arrayDone.reduce((result, current) => {
    return (
      result +
      `
                  <li style="opacity: 0.5">
                  <span>${current.name}</span>
                  <span>
                    <i
                      class="fa fa-trash-alt"
                      style="font-size: 15px; opacity: 0.6"
                      id="${current.id}"
                    ></i>
                    <i class="fa fa-check-circle" id="${current.id}"></i>
                  </span>
                </li>
                `
    );
  }, "");
  document.getElementById("todo").innerHTML = toDoHtml;
  document.getElementById("completed").innerHTML = completehtml;
}

// Thêm mới task
document.getElementById("addItem").addEventListener("click", () => {
  let task = document.getElementById("newTask").value;

  const work = new Task("", task, "not yet");
  try {
    service
      .addTask(work)
      .then(() => {
        init();
      })
      .catch((error) => {
        console.log(error);
      });
    document.getElementById("newTask").value = "";
  } catch (error) {
    console.log(error);
  }
});

// Đánh dấu task
document.getElementById("card__todo").addEventListener("click", (ev) => {
  if (ev.target.className === "fa fa-check-circle") {
    let taskList = result.data;
    taskList.find((item) => {
      if (item.id === ev.target.id) {
        let task = new Task(item.id, item.name, "done");
        service
          .updateStatusTask(task)
          .then(() => {
            init();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
});

// Xóa task
document.getElementById("card__todo").addEventListener("click", (ev) => {
  if (ev.target.className === "fa fa-trash-alt") {
    service
      .deleteTask(ev.target.id)
      .then(() => {
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// Sắp xếp A->Z

document.getElementById("two").addEventListener("click", () => {
  listTask.sort((obj1, obj2) => {
    return obj1.name.localeCompare(obj2.name);
  });
  rendertaskList(listTask);
});

document.getElementById("three").addEventListener("click", () => {
  listTask.sort((obj1, obj2) => {
    return obj2.name.localeCompare(obj1.name);
  });
  rendertaskList(listTask);
});
