// Create the HTML for a task
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const value = "idDone" + id;
  const btnst = "btn_Status" + id;
  const btndelete = "btn_Delete" + id;
  const divView = "div_nameView" + id;
  // alert(value);
  if (status == "Done") {
    return `<div class="card p-0 m-0  col-lg-3 col-md-6 mb-4 ">
                   
                    <div class="card-body p-0 m-0 border border-dark ">



                      <div id   class="card-title bg-green cardheader" >
                       <div class="p-1 m-1 text-right" > Task : ${name}  </div>  <div class="p-1 m-1 text-right "id="div_nameEdit"+${id}>  </div><div class="editTask" style="position:absolute; right:0;">
                      <!--  <button
                              type="button"
                               class="btn-Black"
                              onclick="editTask(${id})" >  Edit 
                           </button> -->
                      <a
                class="btn-Black"
                data-toggle="modal"
                data-target="#addModal"
              >
                <button class="btn-Black font-black btn-lg btn-block"  onclick="editTask(${id})">

                  Edit

                </button></a
              >
                            </div>
                    </div>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Description :</span>
                      </p>
                      <p
                        class="card-text spantextarea p-1 m-1 text-left"
                        id="viewComment"
                      >
                        <span class="spantextarea p-0 m-0"
                          >${description}</span
                        >
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Assigned to :${assignedTo}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span id=${value} class= " cardheader">Status:${status}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Due Date:${dueDate} </span>
                      </p>
                       <p hidden = "hidden"> <span ><input type="textbox" id="txt"  value= ${id} ></span></p>
                       <p class="card-text p-1 m-1 text-left">
                          <span>
                            
                            <button id=${btndelete}
                              type="button"
                              class="btn btnsuccess"
                             
                              
                              onclick="getConfirmation(${id})"
                            >
                           Delete
                            </button> </span> <span> </span>     </p>
                       </div>
                       </div>`;
  } else {
    return `<div class="card p-0 m-0  col-lg-3 col-md-6 mb-4" >
                    <!-- <img src="..." class="card-img-top" alt="..." /> -->
                      <div class="card-body p-0 m-0 border border-dark ">



                      <div id   class="card-title bg-green cardheader" >
                       <div class="p-1 m-1 text-right" > Task : ${name}  </div>  <div class="p-1 m-1 text-right "id="div_nameEdit"+${id}>  </div><div class="editTask" style="position:absolute; right:0;">
                      <!--  <button
                              type="button"
                               class="btn-Black"
                              onclick="editTask(${id})" >  Edit 
                           </button> -->
                      <a
                class="btn-Black"
                data-toggle="modal"
                data-target="#addModal"
              >
                <button class="btn-Black font-black btn-lg btn-block"  onclick="editTask(${id})">

                  Edit

                </button></a
              >
                            </div>
                    </div>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Description :</span>
                      </p>
                      <p
                        class="card-text spantextarea p-1 m-1 text-left"
                        id="viewComment"
                      >
                        <span class="spantextarea p-0 m-0"
                          >${description}</span
                        >
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Assigned to :${assignedTo}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span id=${value}>Status:${status}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Due Date:${dueDate} </span>
                      </p>
                       
                       <p class="card-text p-1 m-1 text-left">
                          <span>
                            
                            <button id=${btnst}
                              type="button"
                              class="btn btnsuccess"
                             
                              
                              onclick="fnUpdate(${id})"
                            >
                            Mark as done
                            </button> </span> 
                   <span hidden = "hidden" ><input type="textbox" id="txt"  value= ${id} ></span>
                    
                          <span>
                            
                            <button id=${btndelete}
                              type="button"
                              class="btn btnsuccess"
                             
                                                            onclick="getConfirmation(${id})"
                            >
                           Delete
                            </button> </span>      </p>
                      
                    </div>
                  </div>`;
  }
};

// task manager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
    //alert(this.currentId);
  }

  addTask(name, description, assignedTo, dueDate, status) {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(task);
    //alert(this.tasks.id);
  }

  // Create the render method to display the task on the browser
  render() {
    //Create a variable storing an empty array to hold the HTML of all the tasks' html, tasksHtmlList.
    const tasksHtmlList = [];

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
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
  } //end of render

  //Add a new method, getTaskById(), it should accept a taskId as a parameter.
  getTaskById(id) {
    // create a foundTask variable to store the found task.
    let foundTask;

    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Store the current task in a variable called task
      const task = this.tasks[i];

      // Compare task.id to the passed in taskId, if its a match, store the task to the variable foundTask
      if (task.id === id) {
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;
  }

  // Create the deleteTask method
  deleteTask(id) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== id) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }

  // Store task JSON to localStorage
  storeTasks() {
    const taskJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", taskJson);
    const currentIdsrting = String(this.currentId);
    localStorage.setItem("currentId", currentIdsrting);
  }

  //get tasks from local storage

  getTasks() {
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if (localStorage.getItem("currentId")) {
      this.currentId = Number(JSON.parse(localStorage.getItem("currentId")));
    }
  }
  // Clear local storage
  clearTasksFromLocalStorage() {
    localStorage.clear();
  }
  getTaskByStatus(status) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Check if the task status is the task status passed in as a parameter
      if (task.status === status) {
        newTasks.push(task);
      }
    }
    return newTasks;
  }
  countTaskByStatus(status) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    let statusLength = 0;
    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop

      const task = this.tasks[i];
      // Check if the task status is the task status passed in as a parameter
      if (task.status === status) {
        newTasks.push(task);
        statusLength = newTasks.length;
      }
    }
    return statusLength;
  }
  getTask() {
    const newTasks = [];
    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      newTasks.push([
        this.tasks[i].name,
        this.tasks[i].assignedTo,
        this.tasks[i].status,
        this.tasks[i].dueDate,
      ]);
    }
    return newTasks;
  }
  taskCount() {
    let tasknumber = 0;
    if (this.tasks.length <= 0) {
      tasknumber = 0;
    } else {
      tasknumber = this.tasks.length;
    }
    return tasknumber;
  }
}
// end of class

if (typeof module != "undefined") {
  module.exports = TaskManager;
}
