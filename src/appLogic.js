import createProject from "./project";
import createTodo from "./todo";

const projects = [];

function createNewProject(name){
    const project = createProject(name);
    projects.push(project);
    return project;
};

function getAllProjects(){
    return projects;
};

const defaultProject = createNewProject("Default");

let selectedProject = defaultProject;

function setSelectedProject(project){
    selectedProject = project;
};

function getSelectedProject(){
    return selectedProject;
}

function saveData(){
    const plainProjects = projects.map((project) => {
        return {
            name: project.name,
            todos: project.getTodos().map(todo => ({
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate,
                priority: todo.priority
            }))
        };
    });

    localStorage.setItem("projects", JSON.stringify(plainProjects));
    localStorage.setItem("selectedProject", selectedProject ? selectedProject.name : null);
}

function loadData(){
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    const storedSelectedProjectName = localStorage.getItem("selectedProject");

    if(storedProjects) {
        projects.length = 0;

        storedProjects.forEach((projectData) => {
            const project = createProject(projectData.name);

            if(Array.isArray(projectData.todos)){
                projectData.todos.forEach((todo) => {
                    project.addTodo(createTodo(todo.title, todo.description, todo.dueDate, todo.priority));
                });
            }
            projects.push(project);
        });

        const found = projects.find(p => p.name === storedSelectedProjectName);
        selectedProject = found || projects[0] || null;
    }
}

export {
    createNewProject,
    getAllProjects,
    defaultProject,
    setSelectedProject,
    getSelectedProject,
    saveData,
    loadData,
};