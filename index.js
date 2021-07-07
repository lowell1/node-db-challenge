const express = require("express");
const app = express();

const helpers = require("./data/helpers");

app.use(express.json());

app.post("/api/projects/:id/resources", (req, res) => {
    helpers.addResource(req.body, req.params.id)
    .then(() => res.sendStatus(201))
    .catch(() => res.status(500).json({message: "could not add resource"}))
});

app.get("/api/projects/:id/resources", (req, res) => {
    helpers.getResources(req.params.id)
    .then(resources => res.status(200).json(resources))
    .catch(() => res.status(500).json({message: "could not get resources"}));
});

app.get("/api/projects", (req, res) => {
    helpers.getProjects()
    .then(projects => res.status(200).json(projects))
    .catch(() => res.status(500).json({message: "could not get projects"}));
});

app.post("/api/projects", (req, res) => {
    helpers.addProject(req.body)
    .then(() => res.sendStatus(201))
    .catch(() => res.status(500).json({message: "could not add project"}));
});

app.post("/api/projects/:id/tasks", (req, res) => {
    helpers.addTask(req.body, req.params.id)
    .then(() => res.sendStatus(201))
    .catch(err => res.status(500).json({message: "could not create task"}));
});

app.get("/api/projects/:id/tasks", (req, res) => {
    helpers.getTasks(req.params.id)
    .then(tasks => {
        res.status(200).json(
            tasks.map(task => {
                return {...task, completed: task.completed ? true : false};
            })
        );
    })
    .catch(() => res.status(500).json({message: "could not get tasks"}));
});

app.listen(5000, () => console.log("server listening port 5000"));