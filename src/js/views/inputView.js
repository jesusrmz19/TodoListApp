import View from './view.js';

class InputView {

    constructor(){
        this._parentElement = document.querySelector('.input--container');
        this._data;
    }
    addHandlerInput(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        });
    }
    getTodo() {
        const value = this._parentElement.querySelector('.todo--input').value;
        this._clearInput();
        return value;
    }
    _clearInput(){
        this._parentElement.querySelector('.todo--input').value = '';
    }

}

export default new InputView();
