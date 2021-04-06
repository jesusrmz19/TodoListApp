class LoginView {
  constructor() {
    this._data;
    this._btnOpen = document.querySelector('.openLogin');
    this._btnClose = document.querySelector('.closeLogin');
    this._overlay = document.querySelector('.overlay--login');
    this._window = document.querySelector('.login--window');
    this._loginInputs = document.querySelectorAll('.login--input');
    this._loginForm = document.querySelector('.login--form');
    this._parentElement = document.querySelector('.login--container');
    // this._signupLogin = document.querySelector('#sulogin');
    this._addHandlerGeneralLogin();
  }
  toggleOverlay() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  toggleFocus(e) {
    const input = e.target;
    const div = input.closest('div');
    if (input.value.trim() === '') {
      input.value = '';
      div.classList.contains('focused')
        ? div.classList.remove('focused')
        : div.classList.add('focused');
    }
  }
  addHandlerChange(handler) {
    // this._signupLogin.addEventListener('click', function (e) {
    //   e.preventDefault();
    //   const btnId = e.target.getAttribute('id');
    //   handler(btnId);
    // });
  }
  addHandlerSubmit(handler) {
    this._loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.querySelector('#elogin');
      const pass = document.querySelector('#plogin');
      const data = {
        email: email.value,
        pass: pass.value,
      };
      email.value = '';
      pass.value = '';
      handler(data);
    });
  }
  _addHandlerGeneralLogin() {
    this._btnOpen.addEventListener('click', this.toggleOverlay.bind(this));
    this._btnClose.addEventListener('click', this.toggleOverlay.bind(this));
    this._overlay.addEventListener('click', this.toggleOverlay.bind(this));
    this._loginInputs.forEach((input) => {
      input.addEventListener('focusin', this.toggleFocus.bind(this));
    });
    this._loginInputs.forEach((input) => {
      input.addEventListener('focusout', this.toggleFocus.bind(this));
    });
  }
}

export default new LoginView();
