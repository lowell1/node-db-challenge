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
    getResources: projectId => {
        return db("resource_projects")
        .select("id", "resource_name")
        .where({project_id: projectId})
        .join("resources", "resource_id", "=", "resources.id");
    },
    addTask: (task, projectId) => {
        return db("tasks").insert({...task, project_id: projectId});
    },
    getTasks: (projectId) => {
        return db("tasks").select("*");
    }
}