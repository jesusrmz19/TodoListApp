import { async } from 'regenerator-runtime';

export const state  = {
    todo: {
        value: '',
        id: '',
        checked: false
    },
    todolist: []
};

const persistTodolist = function () {
    localStorage.setItem('todolist', JSON.stringify(state.todolist));
};

const createId = function(){
    return Date.now() + ''.slice(-10);
}

export const addTodo = function(todo) {
    state.todo = {
        value: todo,
        id: createId(),
        checked: false
    };
    state.todolist.push(state.todo);
    // persistTodolist();
};

export const deleteTodo = function(id) {
    const index = state.todolist.findIndex(el => el.id === id);
    state.todolist.splice(index, 1);
}

export const updateTodo = function(checked, id) {
    console.log(checked);
    const index = state.todolist.findIndex(el => el.id === id.slice(5));
    state.todolist[index].checked = checked;
    console.log(state.todolist);
}

const init = function () {
    const todolist = localStorage.getItem('todolist');
    if (todolist) state.todolist = JSON.parse(todolist);
};
init();

const clearList = function () {
    localStorage.clear('todolist');
};
// clearList();