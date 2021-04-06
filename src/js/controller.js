'use strict';
import * as model from './model.js';
import inputView from './views/inputView.js';
import todoView from './views/todoView.js';
import loginView from './views/loginView.js';
import signupView from './views/signupView.js';
import View from './views/view.js';

const controlUI = function () {
  // const user = await auth.currentUser;
  auth.onAuthStateChanged(async function (user) {
    if (user) {
      todoView.toggleLoginLogout();
      await model.getTodolist();
      todoView.renderAll(model.state.todolist);
    } else {
      model.loadLocalStorage();
      todoView.renderAll(model.state.todolist);
    }
  });
};

const controlAddTodo = function () {
  const todo = inputView.getTodo();
  if (!todo.trim()) return;
  auth.onAuthStateChanged(function (user) {
    if (user) {
      model.addCloudTodo(todo);
      todoView.render(model.state.todo);
    } else {
      model.addLocalTodo(todo);
      todoView.render(model.state.todo);
    }
  });
};

const controlDeleteTodo = function (id) {
  auth.onAuthStateChanged(async function (user) {
    if (user) {
      model.deleteCloudTodo(id);
      await model.getTodolist();
      todoView.renderAll(model.state.todolist);
    } else {
      model.deleteLocalTodo(id);
      todoView.renderAll(model.state.todolist);
    }
  });
};

const controlUpdateCheck = function (checked, fullid) {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      model.updateCloudTodo(checked, fullid);
    } else {
      model.updateTodo(checked, id);
    }
  });
};

const controlSignup = function (data) {
  signupView.toggleOverlay();
  signupView.toggleLogout();
  model.signupUser(data);
};

const controlChange = function (id) {
  if (id === 'sulogin') {
    loginView.toggleOverlay();
    signupView.toggleOverlay();
  } else {
    signupView.toggleOverlay();
    loginView.toggleOverlay();
  }
};

const controlLogin = async function (data) {
  model.loginUser(data);
  await model.getTodolist();
  loginView.toggleOverlay();
  todoView.toggleLoginLogout();
  todoView.renderAll(model.state.todolist);
};

const controlLogout = function () {
  model.logoutUser();
  todoView.toggleLoginLogout();
  model.loadLocalStorage();
  todoView.renderAll(model.state.todolist);
};

const init = function () {
  todoView.addHandlerLoad(controlUI);
  signupView.addHandlerLogout(controlLogout);
  signupView.addHandlerChange(controlChange);
  signupView.addHandlerSubmit(controlSignup);
  loginView.addHandlerChange(controlChange);
  loginView.addHandlerSubmit(controlLogin);
  todoView.addHanlderDelete(controlDeleteTodo);
  todoView.addHanlderCheck(controlUpdateCheck);
  inputView.addHandlerInput(controlAddTodo);
};
init();

// //////////////////////////////////////////////
// // Render Items
// const renderItem = function (item) {
//   const html = `
// <li class="todo--item todo-${count}" data-id="${item.id}">
//   <input type="checkbox" class="hidden-box" id="todo-${count}" />
//   <label class="todo--label" for="todo-${count}">
//     <span class="check--box"></span>
//     <span class="check--text">${item.data().todoitem}</span>
//     <button class="btn--remove btn--${count}" data-todo="${count}" aria-label="Delete Todo Button"></button>
//   </label>
// </li>`;
//   todoList.insertAdjacentHTML('afterbegin', html);
//   const input = document.querySelector(`#todo-${count}`);
//   if (item.data().checked) {
//     input.checked = true;
//   } else {
//     input.checked = false;
//   }
//   input.addEventListener('input', (e) => {
//     e.stopPropagation();
//     let id = e.target.closest('li').getAttribute('data-id');
//     if (e.target.checked) {
//       db.collection('todolist').doc(id).update({ checked: true });
//     } else {
//       db.collection('todolist').doc(id).update({ checked: false });
//     }
//   });
//   document.querySelector(`.btn--${count}`).addEventListener('click', (e) => {
//     e.stopPropagation();
//     let id = e.target.closest('li').getAttribute('data-id');
//     db.collection('todolist').doc(id).delete();
//   });
//   count++;
// };

// /* //////////////////////////////////////////////
// // Add todo
// const addTodo = function () {
//   if (!todoInput.value.trim()) {
//     todoInput.value = '';
//     return;
//   }
//   db.collection('todolist').add({
//     todoitem: todoInput.value,
//     checked: false,
//   });
//   todoInput.value = '';
// }; */

// /* //////////////////////////////////////////////
// // Real-time listener for the firebase database
// db.collection('todolist').onSnapshot((snapshot) => {
//   let changes = snapshot.docChanges();
//   changes.forEach((change) => {
//     if (change.type === 'added') {
//       renderItem(change.doc);
//     } else if (change.type === 'removed') {
//       todoList.querySelector(`[data-id="${change.doc.id}"]`).remove();
//     }
//   });
// }); */

// //////////////////////////////////////////////
// // Event Listeners

// loginBtn.addEventListener('click', function () {
//   console.log('clicked?');
//   document.querySelector('.lgmodal').classList.remove('lgmodal--hidden');
// });

// settsBtn.addEventListener('click', function () {
//   settsModal.classList.toggle('settings--hidden');
// });

// settsColorInput.addEventListener('input', function (e) {
//   document.body.style.backgroundColor = e.target.value;
//   // Usar window get computed style para cambiar el before & after del boton
// });

// defaultBtn.addEventListener('click', function () {
//   settsColorInput.value = defaultColor;
//   document.body.style.backgroundColor = defaultColor;
// });

// db.collection('todolist')
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderList(doc);
//     });
//   });
