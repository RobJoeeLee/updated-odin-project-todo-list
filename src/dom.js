import { getAllProjects, setSelectedProject, getSelectedProject, createNewProject, saveData } from "./appLogic";
import createTodo from "./todo";

function displayProjects(){
    const projectContainer = document.querySelector("#project-container");
    projectContainer.innerHTML = "";

    getAllProjects().forEach((project, index) => {
        const div = document.createElement("div");
        div.textContent = project.name;
        div.classList.add("project");
        div.addEventListener("click", () => {
            setSelectedProject(project);
            displayTodos();
        });

        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.textContent = "Delete";
        deleteProjectButton.style.marginLeft = "10px";

        deleteProjectButton.addEventListener("click", (e) => {
            e.stopPropagation();

            const projects = getAllProjects();
            projects.splice(index, 1);

            const selected = getSelectedProject();
            if(selected === project){
                if(projects.length > 0){
                    setSelectedProject(projects[0]);
                } else {
                    setSelectedProject(null);
                }
                displayTodos();
            }
            displayProjects();
            saveData();
        })
        div.appendChild(deleteProjectButton);
        projectContainer.appendChild(div);
    });
}

function displayTodos(){
    const todoContainer = document.querySelector("#todo-container");
    todoContainer.innerHTML = "";

    const project = getSelectedProject();
    if (!project) {
        todoContainer.textContent = "No project selected.";
        return;
    }
    const todos = project.getTodos();

    todos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const title = document.createElement("h3");
        title.textContent = todo.title;

        const dueDate = document.createElement("p");
        dueDate.textContent = `Due: ${todo.dueDate}`;

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("todo-details");
        detailsDiv.style.display = "none";

        const description = document.createElement("p");
        description.textContent = `Description: ${todo.description}`;

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${todo.priority}`;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", (e) => {
            e.stopPropagation();

            const titleInput = document.createElement("input");
            titleInput.value = todo.title;

            const descriptionInput = document.createElement("input");
            descriptionInput.value = todo.description;

            const dueDateInput = document.createElement("input");
            dueDateInput.type = "date";
            dueDateInput.value = todo.dueDate;

            const prioritySelect = document.createElement("select");
            ["low", "medium", "high"].forEach((level) => {
                const option = document.createElement("option");
                option.value = level;
                option.textContent = level;
                if(todo.priority === level) option.selected = true;
                prioritySelect.appendChild(option);
            });
            
            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";

            detailsDiv.innerHTML = "";
            detailsDiv.appendChild(titleInput);
            detailsDiv.appendChild(descriptionInput);
            detailsDiv.appendChild(dueDateInput);
            detailsDiv.appendChild(prioritySelect);
            detailsDiv.appendChild(saveButton);

            saveButton.addEventListener("click" , (e) => {
                e.stopPropagation();

                todo.title = titleInput.value;
                todo.description = descriptionInput.value;
                todo.dueDate = dueDateInput.value;
                todo.priority = prioritySelect.value;

                displayTodos();
                saveData();
            })
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            project.removeTodo(todo);
            displayTodos();
            saveData();
        })

        detailsDiv.appendChild(description);
        detailsDiv.appendChild(priority);
        detailsDiv.appendChild(editButton);
        detailsDiv.appendChild(deleteButton);

        detailsDiv.addEventListener("click", (e) => {
            e.stopPropagation();
        })

        todoDiv.appendChild(title);
        todoDiv.appendChild(dueDate);
        todoDiv.appendChild(detailsDiv);

        todoDiv.addEventListener("click", () =>{
            detailsDiv.style.display = detailsDiv.style.display === "none" ? "block": "none";
        });
        todoContainer.appendChild(todoDiv);
    });
}

const form = document.getElementById("todo-form");

form.addEventListener("submit", function (e){
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;

    const project = getSelectedProject();
    const newTodo = createTodo(title, description, dueDate, priority);
    project.addTodo(newTodo);

    displayTodos();
    saveData();

    form.reset();
})

const newProjectButton = document.getElementById("new-project-button");
const newProjectForm = document.getElementById("new-project-form");
const projectNameInput = document.getElementById("project-name");

newProjectButton.addEventListener("click", () =>{
    newProjectForm.style.display = "block";
    projectNameInput.focus();
});

newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = projectNameInput.value.trim();
    if(name === "")return;

    const newProject = createNewProject(name);
    setSelectedProject(newProject);

    displayProjects();
    displayTodos();
    saveData();

    newProjectForm.reset();
    newProjectForm.style.display = "none";
})

export { displayProjects, displayTodos };