'use strict';
import * as model from './model.js';
import inputView from './views/inputView.js';
import todoView from './views/todoView.js';
import loginView from './views/loginView.js';
import signupView from './views/signupView.js';
import View from './views/view.js';

const controlAddTodo = function () {
  const todo = inputView.getTodo();
  if (!todo.trim()) return;
  model.addTodo(todo);
  todoView.render(model.state.todo);
};

const controlDeleteTodo = function (id) {
  model.deleteTodo(id);
  todoView.renderAll(model.state.todolist);
};

const controlList = async function () {
  try {
    const user = await auth.currentUser;
    if (user) return;
    model.loadLocalStorage();
    console.log(model.state.todolist);
    todoView.renderAll(model.state.todolist);
  } catch (err) {
    console.log(err);
  }
};

const controlUpdateCheck = function (checked, id) {
  model.updateTodo(checked, id);
};

const controlLogin = function (data) {
  model.loginUser(data);
  loginView.toggleOverlay();
  signupView.toggleLogout();
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

const controlLogout = function () {
  model.logoutUser();
  signupView.toggleLogout();
};

const init = function () {
  todoView.addHandlerRender(controlList);
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
