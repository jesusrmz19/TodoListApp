class LoginView {
  constructor() {
    this._data;
    this._btnOpen = document.querySelector('.openLogin');
    this._btnClose = document.querySelector('.closeLogin');
    this._overlay = document.querySelector('.overlay');
    this._window = document.querySelector('.login--window');
    this._loginInputs = document.querySelectorAll('.login--input');
    // this._parentElement = document.querySelector('.lgmodal');
    this._addHandlerLogin();
  }
  toggleOverlay() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  toggleFocus() {
    console.log(e.target);
  }
  _addHandlerLogin() {
    this._btnOpen.addEventListener('click', this.toggleOverlay.bind(this));
    this._btnClose.addEventListener('click', this.toggleOverlay.bind(this));
    this._overlay.addEventListener('click', this.toggleOverlay.bind(this));
    this._loginInputs.forEach((input) =>
      input.addEventListener('focus', function (e) {
        // this.toggleFocus();
      })
    );
  }
}

export default new LoginView();
