const TaskManager = require("./../js/taskManager.js");
const assert = require("assert");

console.log(TaskManager);
describe("Intailizing the task manager", () => {
  it("should create an empty array", () => {
    const taskManager = new TaskManager(0);

    assert.deepStrictEqual(taskManager.tasks, []);
  });
  it("Should set current id to the passed in number", () => {
    const taskManager = new TaskManager(1);
    assert.strictEqual(taskManager.currentId, 1);
  });
});
describe("testing adding task function", () => {
  it("passing new task data as parameter", () => {
    const taskManager = new TaskManager(4);
    const task = {
      id: taskManager.currentId,
      name: "Gardening",
      description: "Planting Roses",
      assignedTo: "Cecilia",
      dueDate: "2/3/2021",
      status: "TODO",
    };
    taskManager.addTask(
      task.name,
      task.description,
      task.assignedTo,
      task.dueDate,
      task.status
    );
    assert.deepStrictEqual(task.name, "Gardening");
  });
  it("should increment the current id", () => {
    taskManager = new TaskManager(10);
    const task = {
      id: taskManager.currentId,
      name: "cleaning",
      description: "cleaning a car",
      assignedto: "Cecilia",
      duedate: Date.now(),
      status: "ToDO",
    };
    taskManager.addTask(
      task.name,
      task.description,
      task.assignedTo,
      task.duedate,
      task.status
    );
    assert.strictEqual(taskManager.currentId, 11);
  });
  it("checking the count of array", () => {
    const taskManager = new TaskManager(0);
    taskManager.addTask("shoppping", "dentist", "Amy", "24/01/2021");
    let len = taskManager.tasks.length;
    assert.strictEqual(len, 1);
  });
});
describe("Deleting task function", () => {
  describe("when passed an existing taskId", () => {
    it("it should remove the task from task array", () => {
      const taskManager = new TaskManager(6);
      const tasktoDelete = {
        id: taskManager.currentId,
        name: "shopping",
        description: "woolies",
        assignedto: "cecilia",
        duedate: Date.now(),
        status: "todo",
      };
      const taskToKeep = {
        id: taskManager.currentId + 1,
        name: "feed puppy",
        description: "feed the puppy a heathy meal",
        assignedTo: "nick",
        dueDate: Date.now(),
        status: "TODO",
      };

      taskManager.addTask(
        tasktoDelete.name,
        tasktoDelete.description,
        tasktoDelete.assignedTo,
        tasktoDelete.dueDate,
        tasktoDelete.status
      );
      //taskManager.addTask(tasktoKeep.name,tasktoKeep.description,tasktoKeep.assignedTo,tasktoKeep.dueDate,tasktoKeep.status);
      taskManager.addTask(
        taskToKeep.name,
        taskToKeep.description,
        taskToKeep.assignedTo,
        taskToKeep.dueDate,
        taskToKeep.status
      );
      taskManager.deleteTask(tasktoDelete.id);
      assert.strictEqual(taskToKeep.id, 7);
      assert.strictEqual(tasktoDelete.id, 6);
      assert.deepStrictEqual(taskManager.tasks, [taskToKeep]);
    });

    it("passing task id to delete the task", () => {
      const taskManager = new TaskManager(0);
      taskManager.addTask("shoppping", "At Aldi", "cecilia", "24/01/2021");
      taskManager.deleteTask(0);
      let len = taskManager.tasks.length;
      assert.strictEqual(len, 0);
    });
  });
});
describe("Get task by id", () => {
  it("getTaskById by matching the task", () => {
    const taskManager = new TaskManager(1);
    const task = {
      id: taskManager.currentId,
      name: "Cleaning",
      description: "cleaning backyard",
      assignedTo: "cecilia",
      dueDate: Date.now(),
      status: "todo",
    };
    taskManager.addTask(
      task.name,
      task.description,
      task.assignedTo,
      task.dueDate,
      task.status
    );
    const findTask = taskManager.getTaskById(task.id);
    assert.deepStrictEqual(findTask, task);
  });
  it(" getTaskById match description", () => {
    const taskManager = new TaskManager(0);
    taskManager.addTask("shoppping", "At Aldi", "Amy", "24/01/2021");
    taskManager.addTask("payment", "Hotel", "Amy", "26/01/2021");
    taskManager.addTask("appointment", "Hornsby", "Amy", "26/01/2021");
    const reslut1 = taskManager.getTaskById(2).name;

    assert.strictEqual(reslut1, "appointment");
    const reslut2 = taskManager.getTaskById(2).description;
    assert.strictEqual(reslut2, "Hornsby");
  });
it("Test getTaskById Function", () => {
  const taskManager = new TaskManager(0);
  taskManager.addTask("shoppping", "At Aldi", "Amy", "24/01/2021","To-do");
  taskManager.addTask("payment", "Hotel", "Amy", "26/01/2021");
  taskManager.addTask("appointment", "Hornsby", "Amy", "26/01/2021");
  const reslut1 = taskManager.getTaskByStatus("To-do");
  console.log(reslut1);
});

});
/* Cecilia test cases
const assert = require("assert");
const TaskManager = require("./../js/taskManager.js");
console.log(TaskManager);
describe("Testing Task Manager functions", () => {
  it("Add task", () => {
    const taskManager = new TaskManager(0);
    taskManager.addTask("Shopping",
  "Milk,water,icecream",
  "Amy",
  "22-12-2020",
  "To-do"
)
    let actual = taskManager.tasks.length;
    let expected=1
   // taskManager.tasks.id=1;
    assert.strictEqual(actual, expected);
    //console.log(id);
  });
  it("delete task", () => {
    const taskManager = new TaskManager(0);
   
    taskManager.addTask(
      "shoppping",
      "At Aldi",
      "Lavina",
      "24/01/2021",
      "TO do"
    );
   taskManager.addTask(
      "shoppping",
      "At Aldi",
      "Cecilia",
      "24/01/2021",
      "TO do"
    );
      taskManager.addTask(
        "shoppping",
        "At Aldi",
        "Lavina",
        "24/01/2021",
        "TO do"
      );
        taskManager.addTask(
          "shoppping",
          "At Aldi",
          "Lavina",
          "24/01/2021",
          "TO do"
        );
    taskManager.deleteTask(1);
    let actual = taskManager.tasks.length;
    let expected =3
    assert.strictEqual(actual, expected);
  });
   it("Find task by id", () => {
   const taskManager = new TaskManager(0);
   
    taskManager.addTask(
      "Shopping",
      "Milk,water,icecream",
      "Amy",
      "22-12-2020",
      "To-do"
    );
    taskManager.addTask(
      "Aldi Shopping",
      "At Aldi",
      "Lavina",
      "24/01/2021",
      "TO do"
    );
    taskManager.addTask(
      "Gardening",
      "At Aldi",
      "Lavina",
      "24/01/2021",
      "TO do"
    );
  const task=  taskManager.getTaskById(2);
   let actual = task.name;
   assert.strictEqual(actual,"Gardening" );
   });
});*/
