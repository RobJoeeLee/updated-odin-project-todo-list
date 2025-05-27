function createProject(name){
    const todos = [];

    function addTodo(todo){
        todos.push(todo);
    };

    function removeTodo(todoToRemove){
        const index = todos.indexOf(todoToRemove);
        if(index !== -1){
            todos.splice(index, 1);
        }
    };

    function getTodos(){
        return todos;
    };

    return { name, addTodo, removeTodo, getTodos };
};

export default createProject;