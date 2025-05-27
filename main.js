/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/appLogic.js":
/*!*************************!*\
  !*** ./src/appLogic.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createNewProject: () => (/* binding */ createNewProject),\n/* harmony export */   defaultProject: () => (/* binding */ defaultProject),\n/* harmony export */   getAllProjects: () => (/* binding */ getAllProjects),\n/* harmony export */   getSelectedProject: () => (/* binding */ getSelectedProject),\n/* harmony export */   loadData: () => (/* binding */ loadData),\n/* harmony export */   saveData: () => (/* binding */ saveData),\n/* harmony export */   setSelectedProject: () => (/* binding */ setSelectedProject)\n/* harmony export */ });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n\n\n\nconst projects = [];\n\nfunction createNewProject(name){\n    const project = (0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name);\n    projects.push(project);\n    return project;\n};\n\nfunction getAllProjects(){\n    return projects;\n};\n\nconst defaultProject = createNewProject(\"Default\");\n\nlet selectedProject = defaultProject;\n\nfunction setSelectedProject(project){\n    selectedProject = project;\n};\n\nfunction getSelectedProject(){\n    return selectedProject;\n}\n\nfunction saveData(){\n    const plainProjects = projects.map((project) => {\n        return {\n            name: project.name,\n            todos: project.getTodos().map(todo => ({\n                title: todo.title,\n                description: todo.description,\n                dueDate: todo.dueDate,\n                priority: todo.priority\n            }))\n        };\n    });\n\n    localStorage.setItem(\"projects\", JSON.stringify(plainProjects));\n    localStorage.setItem(\"selectedProject\", selectedProject ? selectedProject.name : null);\n}\n\nfunction loadData(){\n    const storedProjects = JSON.parse(localStorage.getItem(\"projects\"));\n    const storedSelectedProjectName = localStorage.getItem(\"selectedProject\");\n\n    if(storedProjects) {\n        projects.length = 0;\n\n        storedProjects.forEach((projectData) => {\n            const project = (0,_project__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(projectData.name);\n\n            if(Array.isArray(projectData.todos)){\n                projectData.todos.forEach((todo) => {\n                    project.addTodo((0,_todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(todo.title, todo.description, todo.dueDate, todo.priority));\n                });\n            }\n            projects.push(project);\n        });\n\n        const found = projects.find(p => p.name === storedSelectedProjectName);\n        selectedProject = found || projects[0] || null;\n    }\n}\n\n\n\n//# sourceURL=webpack://updated-odin-project-todo-list/./src/appLogic.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayProjects: () => (/* binding */ displayProjects),\n/* harmony export */   displayTodos: () => (/* binding */ displayTodos)\n/* harmony export */ });\n/* harmony import */ var _appLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appLogic */ \"./src/appLogic.js\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n\n\n\nfunction displayProjects(){\n    const projectContainer = document.querySelector(\"#project-container\");\n    projectContainer.innerHTML = \"\";\n\n    (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.getAllProjects)().forEach((project, index) => {\n        const div = document.createElement(\"div\");\n        div.textContent = project.name;\n        div.classList.add(\"project\");\n        div.addEventListener(\"click\", () => {\n            (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.setSelectedProject)(project);\n            displayTodos();\n        });\n\n        const deleteProjectButton = document.createElement(\"button\");\n        deleteProjectButton.textContent = \"Delete\";\n        deleteProjectButton.style.marginLeft = \"10px\";\n\n        deleteProjectButton.addEventListener(\"click\", (e) => {\n            e.stopPropagation();\n\n            const projects = (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.getAllProjects)();\n            projects.splice(index, 1);\n\n            const selected = (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.getSelectedProject)();\n            if(selected === project){\n                if(projects.length > 0){\n                    (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.setSelectedProject)(projects[0]);\n                } else {\n                    (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.setSelectedProject)(null);\n                }\n                displayTodos();\n            }\n            displayProjects();\n            (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.saveData)();\n        })\n        div.appendChild(deleteProjectButton);\n        projectContainer.appendChild(div);\n    });\n}\n\nfunction displayTodos(){\n    const todoContainer = document.querySelector(\"#todo-container\");\n    todoContainer.innerHTML = \"\";\n\n    const project = (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.getSelectedProject)();\n    if (!project) {\n        todoContainer.textContent = \"No project selected.\";\n        return;\n    }\n    const todos = project.getTodos();\n\n    todos.forEach((todo) => {\n        const todoDiv = document.createElement(\"div\");\n        todoDiv.classList.add(\"todo\");\n\n        const title = document.createElement(\"h3\");\n        title.textContent = todo.title;\n\n        const dueDate = document.createElement(\"p\");\n        dueDate.textContent = `Due: ${todo.dueDate}`;\n\n        const detailsDiv = document.createElement(\"div\");\n        detailsDiv.classList.add(\"todo-details\");\n        detailsDiv.style.display = \"none\";\n\n        const description = document.createElement(\"p\");\n        description.textContent = `Description: ${todo.description}`;\n\n        const priority = document.createElement(\"p\");\n        priority.textContent = `Priority: ${todo.priority}`;\n\n        const editButton = document.createElement(\"button\");\n        editButton.textContent = \"Edit\";\n\n        editButton.addEventListener(\"click\", (e) => {\n            e.stopPropagation();\n\n            const titleInput = document.createElement(\"input\");\n            titleInput.value = todo.title;\n\n            const descriptionInput = document.createElement(\"input\");\n            descriptionInput.value = todo.description;\n\n            const dueDateInput = document.createElement(\"input\");\n            dueDateInput.type = \"date\";\n            dueDateInput.value = todo.dueDate;\n\n            const prioritySelect = document.createElement(\"select\");\n            [\"low\", \"medium\", \"high\"].forEach((level) => {\n                const option = document.createElement(\"option\");\n                option.value = level;\n                option.textContent = level;\n                if(todo.priority === level) option.selected = true;\n                prioritySelect.appendChild(option);\n            });\n            \n            const saveButton = document.createElement(\"button\");\n            saveButton.textContent = \"Save\";\n\n            detailsDiv.innerHTML = \"\";\n            detailsDiv.appendChild(titleInput);\n            detailsDiv.appendChild(descriptionInput);\n            detailsDiv.appendChild(dueDateInput);\n            detailsDiv.appendChild(prioritySelect);\n            detailsDiv.appendChild(saveButton);\n\n            saveButton.addEventListener(\"click\" , (e) => {\n                e.stopPropagation();\n\n                todo.title = titleInput.value;\n                todo.description = descriptionInput.value;\n                todo.dueDate = dueDateInput.value;\n                todo.priority = prioritySelect.value;\n\n                displayTodos();\n                (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.saveData)();\n            })\n        });\n\n        const deleteButton = document.createElement(\"button\");\n        deleteButton.textContent = \"Delete\";\n        deleteButton.addEventListener(\"click\", (e) => {\n            e.stopPropagation();\n            project.removeTodo(todo);\n            displayTodos();\n            (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.saveData)();\n        })\n\n        detailsDiv.appendChild(description);\n        detailsDiv.appendChild(priority);\n        detailsDiv.appendChild(editButton);\n        detailsDiv.appendChild(deleteButton);\n\n        detailsDiv.addEventListener(\"click\", (e) => {\n            e.stopPropagation();\n        })\n\n        todoDiv.appendChild(title);\n        todoDiv.appendChild(dueDate);\n        todoDiv.appendChild(detailsDiv);\n\n        todoDiv.addEventListener(\"click\", () =>{\n            detailsDiv.style.display = detailsDiv.style.display === \"none\" ? \"block\": \"none\";\n        });\n        todoContainer.appendChild(todoDiv);\n    });\n}\n\nconst form = document.getElementById(\"todo-form\");\n\nform.addEventListener(\"submit\", function (e){\n    e.preventDefault();\n\n    const title = document.getElementById(\"title\").value;\n    const description = document.getElementById(\"description\").value;\n    const dueDate = document.getElementById(\"due-date\").value;\n    const priority = document.getElementById(\"priority\").value;\n\n    const project = (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.getSelectedProject)();\n    const newTodo = (0,_todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(title, description, dueDate, priority);\n    project.addTodo(newTodo);\n\n    displayTodos();\n    (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.saveData)();\n\n    form.reset();\n})\n\nconst newProjectButton = document.getElementById(\"new-project-button\");\nconst newProjectForm = document.getElementById(\"new-project-form\");\nconst projectNameInput = document.getElementById(\"project-name\");\n\nnewProjectButton.addEventListener(\"click\", () =>{\n    newProjectForm.style.display = \"block\";\n    projectNameInput.focus();\n});\n\nnewProjectForm.addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n\n    const name = projectNameInput.value.trim();\n    if(name === \"\")return;\n\n    const newProject = (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.createNewProject)(name);\n    (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.setSelectedProject)(newProject);\n\n    displayProjects();\n    displayTodos();\n    (0,_appLogic__WEBPACK_IMPORTED_MODULE_0__.saveData)();\n\n    newProjectForm.reset();\n    newProjectForm.style.display = \"none\";\n})\n\n\n\n//# sourceURL=webpack://updated-odin-project-todo-list/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _appLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appLogic */ \"./src/appLogic.js\");\n\n\n\n(0,_appLogic__WEBPACK_IMPORTED_MODULE_1__.loadData)();\n(0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayProjects)();\n(0,_dom__WEBPACK_IMPORTED_MODULE_0__.displayTodos)();\n\n//# sourceURL=webpack://updated-odin-project-todo-list/./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction createProject(name){\n    const todos = [];\n\n    function addTodo(todo){\n        todos.push(todo);\n    };\n\n    function removeTodo(todoToRemove){\n        const index = todos.indexOf(todoToRemove);\n        if(index !== -1){\n            todos.splice(index, 1);\n        }\n    };\n\n    function getTodos(){\n        return todos;\n    };\n\n    return { name, addTodo, removeTodo, getTodos };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createProject);\n\n//# sourceURL=webpack://updated-odin-project-todo-list/./src/project.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction createTodo(title, description, dueDate, priority){\n    return {\n        title,\n        description,\n        dueDate,\n        priority,\n        completed: false\n    };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTodo);\n\n//# sourceURL=webpack://updated-odin-project-todo-list/./src/todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;