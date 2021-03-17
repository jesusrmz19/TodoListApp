class LoginView {
  constructor() {
    this._data;
    this._btnOpen = document.querySelector('.openLogin');
    this._btnClose = document.querySelector('.closeLogin');
    this._overlay = document.querySelector('.overlay');
    this._window = document.querySelector('.login--window');
    this._loginInputs = document.querySelectorAll('.login--input');
    this._parentElement = document.querySelector('.login--container');
    this._addHandlerLogin();
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
  _addHandlerLogin() {
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
