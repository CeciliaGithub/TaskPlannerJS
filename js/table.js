google.charts.load("current", { packages: ["table"] });
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Task");
  data.addColumn("string", "assignTo");
  data.addColumn("string", "Status");
  data.addColumn("string", "dueDate");
  
 console.log(taskManager.tasks)
    data.addRows(taskManager.getTask());
  

  var table = new google.visualization.Table(
    document.getElementById("table_div")
  );
  console.log(data);
  table.draw(data, {
    showRowNumber: true,
    width: "100%",
    height: "100%",
  });
}
