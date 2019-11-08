const helpers = require("./data/helpers");

// helpers.addProject({project_name: "project1", description: "description"})
// .then(() => {
//     helpers.getProjects()
//     .then(projects => console.log(projects))
// })

// helpers.addResource({resource_name: "asdaw"}, 1);

// helpers.addTask({task_name: "task1", project_id: 1, completed: false})
// .then(count => console.log(count));

helpers.getTasks().then(tasks => console.log(tasks));