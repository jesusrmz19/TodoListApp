class LoginView {
  constructor() {
    this._data;
    this._btnOpen = document.querySelector('.openLogin');
    this._btnClose = document.querySelector('.closeLogin');
    this._overlay = document.querySelector('.overlay');
    this._window = document.querySelector('.login--window');
    // this._parentElement = document.querySelector('.lgmodal');
    this._addHandlerLogin();
  }
  toggleOverlay() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerLogin() {
    this._btnOpen.addEventListener('click', this.toggleOverlay.bind(this));
    this._btnClose.addEventListener('click', this.toggleOverlay.bind(this));
    this._overlay.addEventListener('click', this.toggleOverlay.bind(this));
  }
}

export default new LoginView();
