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

export const loadLocalStorage = function () {
  const todolist = localStorage.getItem('todolist');
  if (todolist) state.todolist = JSON.parse(todolist);
};

const clearList = function () {
  localStorage.clear('todolist');
};

const createId = function () {
  return Date.now() + ''.slice(-10);
};

export const addLocalTodo = function (todo) {
  state.todo = {
    value: todo,
    id: createId(),
    checked: false,
  };
  state.todolist.push(state.todo);
  persistTodolist();
};

export const addCloudTodo = function (todo) {
  state.todo = {
    value: todo,
    id: createId(),
    checked: false,
  };
  state.todolist.push(state.todo);
  console.log(state.todolist);
  db.collection('todolist').doc(state.todo.id).set({
    value: state.todo.value,
    id: state.todo.id,
    checked: state.todo.checked,
  });
};

export const deleteLocalTodo = function (id) {
  const index = state.todolist.findIndex((el) => el.id === id);
  state.todolist.splice(index, 1);
  persistTodolist();
};

export const deleteCloudTodo = async function (id) {
  try {
    const todo = await db.collection('todolist').where('id', '==', id).get();
    todo.forEach((elem) => elem.ref.delete());
    const index = state.todolist.findIndex((el) => el.id === id);
    state.todolist.splice(index, 1);
    console.log(state.todolist);
  } catch (err) {
    console.error(` ⚠⚠ ${err} ⚠⚠ `);
  }
};

export const updateTodo = function (checked, id) {
  const index = state.todolist.findIndex((el) => el.id === id.slice(5));
  state.todolist[index].checked = checked;
  persistTodolist();
};

export const updateCloudTodo = function (checked, fullid) {
  const index = state.todolist.findIndex((el) => el.id === fullid.slice(5));
  state.todolist[index].checked = checked;
  const id = fullid.slice(5);
  db.collection('todolist').doc(id).set(
    {
      checked: checked,
    },
    { merge: true }
  );
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
    auth.signOut();
    console.log('GOODBYE');
    state.loggedIn = false;
    state.todolist = [];
    console.log(state.todolist);
  } catch (err) {
    console.error(` ⚠⚠ ${err} ⚠⚠ `);
  }
};

export const loginUser = async function (user) {
  try {
    await auth.signInWithEmailAndPassword(user.email, user.pass);
    console.log(`WELCOME ${user.email}!`);
  } catch {
    console.error(` ⚠⚠ ${err} ⚠⚠ `);
  }
};

// Get data
export const getTodolist = async function () {
  try {
    const data = await db.collection('todolist').get();
    state.todolist = [];
    data.docs.forEach((doc) => {
      state.todolist.push(doc.data());
    });
    console.log(state.todolist);
  } catch (err) {
    console.error(` ⚠⚠ ${err} ⚠⚠ `);
  }
};

// db.collection('todolist')
//   .get()
//   .then((snapshot) => {
//     console.log(snapshot.docs);
//   });

// clearList();
