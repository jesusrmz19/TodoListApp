import { async } from 'regenerator-runtime';

export const state = {
  todo: {
    value: '',
    id: '',
    checked: false,
  },
  todolist: [],
  loggedIn: false,
};

const persistTodolist = function () {
  localStorage.setItem('todolist', JSON.stringify(state.todolist));
};

const createId = function () {
  return Date.now() + ''.slice(-10);
};

export const addTodo = function (todo) {
  state.todo = {
    value: todo,
    id: createId(),
    checked: false,
  };
  state.todolist.push(state.todo);
  persistTodolist();
};

export const deleteTodo = function (id) {
  const index = state.todolist.findIndex((el) => el.id === id);
  state.todolist.splice(index, 1);
  persistTodolist();
};

export const updateTodo = function (checked, id) {
  const index = state.todolist.findIndex((el) => el.id === id.slice(5));
  state.todolist[index].checked = checked;
  persistTodolist();
};

export const signupUser = async function (user) {
  try {
    const cred = await auth.createUserWithEmailAndPassword(
      user.email,
      user.pass
    );
    state.loggedIn = true;
    console.log(cred);
  } catch (err) {
    console.error(` ⚠⚠ ${err} ⚠⚠ `);
  }
};

export const logoutUser = async function (user) {
  try {
    const signout = auth.signOut();
    console.log(signout);
    state.loggedIn = false;
  } catch (err) {
    console.error(` ⚠⚠ ${err} ⚠⚠ `);
  }
};

export const loginUser = async function (user) {
  try {
    const cred = await auth.signInWithEmailAndPassword(user.email, user.pass);
  } catch {
    console.error(` ⚠⚠ ${err} ⚠⚠ `);
  }
};
/* export const loginUser = function (user) {
  base
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((user) => {
      console.log('auth');
    })
    .catch((err) => {
      console.log(err);
    });
}; */

export const init = function () {
  const todolist = localStorage.getItem('todolist');
  if (todolist) state.todolist = JSON.parse(todolist);
};
init();

const clearList = function () {
  localStorage.clear('todolist');
};
// clearList();
