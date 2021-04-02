class SignupView {
  constructor() {
    this._data;
    this._btnLogout = document.querySelector('.logout');
    this._btnLogin = document.querySelector('.openLogin');
    this._btnClose = document.querySelector('.closeSignUp');
    this._overlay = document.querySelector('.overlay--signup');
    this._window = document.querySelector('.signup--window');
    this._signupInputs = document.querySelectorAll('.signup--input');
    this._signupForm = document.querySelector('.signup--form');
    this._parentElement = document.querySelector('.signup--container');
    this._loginSignup = document.querySelector('#lgsignup');
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
  toggleLogout() {
    this._btnLogout.classList.toggle('hidden');
  }
  addHandlerLogout(handler) {
    this._btnLogout.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerChange(handler) {
    this._loginSignup.addEventListener('click', function (e) {
      e.preventDefault();
      const btnId = e.target.getAttribute('id');
      handler(btnId);
    });
  }
  addHandlerSubmit(handler) {
    this._signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.querySelector('#esignup');
      const pass = document.querySelector('#psignup');
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
    this._btnClose.addEventListener('click', this.toggleOverlay.bind(this));
    this._overlay.addEventListener('click', this.toggleOverlay.bind(this));
    this._signupInputs.forEach((input) => {
      input.addEventListener('focusin', this.toggleFocus.bind(this));
    });
    this._signupInputs.forEach((input) => {
      input.addEventListener('focusout', this.toggleFocus.bind(this));
    });
  }
}

export default new SignupView();
