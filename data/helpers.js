const db = require("./db");

module.exports = {
    addProject: project => {
        return db("projects").insert(project);
    },
    getProjects: () => {
        return db("projects").select("*")
    },
    addResource: (resource, project_id) => {
        return db("resources").insert(resource)
        .then(ids => db("resource_projects").insert({project_id: project_id, resource_id: ids[0]}));
    },
    getResources: () => {
        return db("resources").select("*");
    },
    addTask: task => {
        return db("tasks").insert(task);
    },
    getTasks: () => {
        return db("tasks").select("*")
        .then(tasks => {
            tasks.forEach(task => task.completed = task.completed ? true : false);
            return tasks;
        });
    }
}