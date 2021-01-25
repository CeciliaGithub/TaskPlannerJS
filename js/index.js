//added new task
const taskManager = new TaskManager(0);

taskManager.getTasks();
taskManager.render();

//pie chart
drawPieChart();
//draw pie chart
function drawPieChart() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    let statusToDo = taskManager.countTaskByStatus("To-do");
    const statusReview = taskManager.countTaskByStatus("Review");
    const statusDone = taskManager.countTaskByStatus("Done");
    const statusProgress = taskManager.countTaskByStatus("In progress");
    const taskNumber = taskManager.taskCount();
    if (taskNumber == 0) {
      document.getElementById("piechart").style.display = none;
    }
    //alert(statusProgress);
    var data = google.visualization.arrayToDataTable([
      ["Task", "Total Task"],
      ["To-Do", statusToDo],
      ["In Progress", statusProgress],
      ["Review", statusReview],
      ["Done", statusDone],
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
      title: "Task Status",
      height: 400,

      fontSize: "14",
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );
    chart.draw(data, options);
    // taskManager.render();
  }
  //end pie chart
}
document.querySelector("#idAdd").style.display = "";
document.querySelector("#idUpdate").style.display = "none";

// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");
// Select the inputs
const newTaskNameInput = document.querySelector("#newTaskNameInput");
const newTaskDescription = document.querySelector("#newTaskDescription");
const newTaskStatus = document.querySelector("#newTaskStatus");
const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
const newTaskDueDate = document.querySelector("#newTaskDueDate");
const errorMessage = document.querySelector("#alertMessage");
//to disable the past dates in calendar
$(function () {
  let maxDate = getTodayDate();
  $("#newTaskDueDate").attr("min", maxDate);
});
//onload addmodal --to set focus on first element
$("#addModal").on("shown.bs.modal", function () {
  newTaskNameInput.focus();

  //document.querySelector("#id_Edit").value = "ADD"
  if (document.querySelector("#id_Edit").value == "ADD") {
    clearFields();
    document.querySelector("#value_Task").innerHTML = "Add Task";
    document.querySelector("#idUpdate").style.display = "none";
    document.querySelector("#idAdd").style.display = "block";
    // document.querySelector("#edit_Header").style.display = "none";
    // document.querySelector("#other_Header").style.display = "none";
  } else {
    document.querySelector("#value_Task").innerHTML = "Edit Task";
    document.querySelector("#idAdd").style.display = "none";
    document.querySelector("#idUpdate").style.display = "block";
  }
});

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();
  // Get the values of the inputs

  const name = newTaskNameInput.value;
  const description = newTaskDescription.value;
  const taskStatus = newTaskStatus.value;
  const txtTaskStatus = document.querySelector("#newTaskStatus").options[
    document.querySelector("#newTaskStatus").selectedIndex
  ].text;

  const assignedTo = newTaskAssignedTo.value;
  const txtAssignTo = document.querySelector("#newTaskAssignedTo").options[
    document.querySelector("#newTaskAssignedTo").selectedIndex
  ].text;
  const dueDate = newTaskDueDate.value;
  const status = newTaskStatus.innerHTML;

  if (!validFormFieldInput(name)) {
    errorName.innerHTML = "Invalid Name ";
    errorName.style.display = "block";

    newTaskNameInput.focus();
  } else {
    errorName.style.display = "none";
  }
  if (!validFormFieldInput(description)) {
    errorDescription.innerHTML = "Invalid Description";
    errorDescription.style.display = "block";
    if (newTaskNameInput.value != "") {
      newTaskDescription.focus();
    }
  } else {
    errorDescription.style.display = "none";
  }
  if (
    validFormDropdown(taskStatus) == 1 &&
    validFormDropdown(assignedTo) == 0 &&
    newTaskDescription.value != ""
  ) {
    // errorTaskStatus.innerHTML = "Invalid Status";
    //errorTaskStatus.style.display = "block";
    newTaskStatus.focus();
    errorTaskStatus.style.display = "none";
  }
  if (validFormDropdown(assignedTo) == 0) {
    errorAssignTo.innerHTML = "Invalid Asignee";
    errorAssignTo.style.display = "block";
    if (newTaskStatus.value >= 1 && newTaskDescription.value != "") {
      newTaskAssignedTo.focus();
    }
  } else {
    errorAssignTo.style.display = "none";
  }
  if (!validFormFieldInput(dueDate)) {
    errorDueDate.innerHTML = "Invalid duedate";
    errorDueDate.style.display = "block";
    if (
      newTaskStatus.value >= 1 &&
      newTaskDescription.value != "" &&
      newTaskAssignedTo.value > 0
    ) {
      newTaskDueDate.focus();
    }
  } else {
    errorDueDate.style.display = "none";
    var FormatDueDate = updateDueDate(dueDate);
    if (document.querySelector("#id_Edit").value == "ADD") {
      taskManager.addTask(
        name,
        description,
        txtAssignTo,
        FormatDueDate,
        txtTaskStatus
      );

      taskManager.storeTasks();
      taskManager.render();
      clearFields();
      drawPieChart();
    } else {
      updateAllDetails();
      drawPieChart();
    }
    //  $("#addModal").modal().hide();
    $("#addModal .close").click();

    //taskManager.addTask("shopping", "milk", "Tom", "22-12-2020", "toDO");
  }
});
function clearFields() {
  newTaskNameInput.value = "";
  newTaskDescription.value = "";
  newTaskStatus.value = 1;
  newTaskAssignedTo.value = 0;
  newTaskDueDate.value = "";
}
//Format due date
function updateDueDate(dueDate) {
  //var strDueDate = dueDate;
  var strDueDate = dueDate.split("-");
  var rtnDueDate = strDueDate[2] + "-" + strDueDate[1] + "-" + strDueDate[0];
  return rtnDueDate;
} //to show date in date input box in the format yyyy/mm/dd
function displayDueDate(dueDate) {
  //var strDueDate = dueDate;
  var strDueDate = dueDate.split("-");
  var rtnDueDate = strDueDate[2] + "-" + strDueDate[1] + "-" + strDueDate[0];

  return rtnDueDate;
}
function validFormFieldInput(data) {
  return data !== null && data !== "";
}
function validFormDropdown(data) {
  return data;
}
function getConfirmation(deleteId) {
  //('#btnCancel').addClass('btn-secondary');
  const task = taskManager.getTaskById(deleteId);
  const taskName = task.name;
  var retVal = confirm(`Do you want to delete the task ${taskName}?`);
  //var retVal = confirm("Do you want to delete the task?");
  if (retVal == true) {
    fnDelete(deleteId);
    location.reload();
    return true;
  } else {
    return false;
  }
}

function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
}
//updating the status
function fnUpdate(id) {
  //finding the task according to id
  const task = taskManager.getTaskById(id);
  //updating the status
  task.status = "Done";

  taskManager.render();
  taskManager.storeTasks();
  location.reload();
}
function editTask(id) {
  const task = taskManager.getTaskById(id);
  document.querySelector("#id_Edit").value = id;
  newTaskNameInput.value = task.name;
  newTaskDescription.value = task.description;
  let viewDate = displayDueDate(task.dueDate);
  newTaskDueDate.value = viewDate;
  let status = task.status;
  for (var i = 0; i < newTaskStatus.options.length; i++) {
    if (newTaskStatus.options[i].text === status) {
      newTaskStatus.selectedIndex = i;
      newTaskStatus.text = document.querySelector("#newTaskStatus").options[
        i
      ].value;
      break;
    }
  }
  let assignTo = task.assignedTo;
  for (var k = 0; k < newTaskAssignedTo.options.length; k++) {
    if (newTaskAssignedTo.options[k].text === task.assignedTo) {
      newTaskAssignedTo.selectedIndex = k;
      newTaskAssignedTo.text = document.querySelector(
        "#newTaskAssignedTo"
      ).options[k].value;
      return;
    }
  }
}
function updateAllDetails() {
  let idn = document.querySelector("#id_Edit").value;
  result = parseInt(idn);
  const task = taskManager.getTaskById(result);
  task.name = newTaskNameInput.value;
  //alert(task.name);
  task.status = document.querySelector("#newTaskStatus").options[
    document.querySelector("#newTaskStatus").selectedIndex
  ].text;
  task.description = newTaskDescription.value;
  task.assignedTo = document.querySelector("#newTaskAssignedTo").options[
    document.querySelector("#newTaskAssignedTo").selectedIndex
  ].text;
  let dueDate = newTaskDueDate.value;
  var FormatDueDate = updateDueDate(dueDate);
  task.dueDate = FormatDueDate;
  taskManager.render();
  taskManager.storeTasks();
  // $("#addModal").modal().hide();
  $("#addModal .close").click();
  clearFields();
}

function fnDelete(taskId) {
  taskManager.deleteTask(taskId);
  taskManager.render();
  taskManager.storeTasks();
}
//filter
btnfilter = document.getElementById("btnfilter");
btnfilter.addEventListener("click", changefunction);
function changefunction() {
  //alert();

  var selectBox = document.getElementById("selectBox");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  const tasks = taskManager.getTaskByStatus(selectedValue);
  if (selectedValue == "All") {
    taskManager.render();
  } else {
    renderByStatus(tasks);
  }
}
function renderByStatus(tasks) {
  const tasksHtmlList = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    // Create a taskHtml variable to store the HTML of the current task, by calling the createTaskHtml function and using the properties of the current task, as well as the new formattedDate variable for the parameters.

    const taskHtml = createTaskHtml(
      task.id,
      task.name,
      task.description,
      task.assignedTo,
      task.dueDate,
      task.status
    );
    //push the taskHtml into the tasksHtmlList array.
    tasksHtmlList.push(taskHtml);
  } //end of looping
  //create a tasksHtml variable, set the variable to a string of HTML of all the tasks by joining the tasksHtmlList array together, separating each task's html with a newline.
  const tasksHtml = tasksHtmlList.join("\n");
  //Select the tasks list element and set its innerHTML to the tasksHtml.
  const tasksList = document.querySelector("#tasksList");
  tasksList.innerHTML = tasksHtml;
} //end of filter

function fnAdd() {
  // alert();
  id_Edit = document.querySelector("#id_Edit");
  id_Edit.value = "ADD";
  clearFields();
}

function changetheme() {
  var changeTheme = document.getElementById("changeTheme");
  var selectedValue = changeTheme.options[changeTheme.selectedIndex].value;
  document.head.innerHTML += `<link rel="stylesheet" href="css/${selectedValue}">`;

  //alert(selectedValue);
}
