import View from './view.js';

class TodoView extends View{
    constructor(){
        super();
        this._parentElement = document.querySelector('.todo--list');
        this._data;
    }
    addHandlerRender(handler){
        window.addEventListener('load', handler);
    }
    addHanlderCheck(handler){
        this._parentElement.addEventListener('change', function(e){
            const inputElm = e.target;
            const checked = inputElm.checked;
            const label = inputElm.parentNode.querySelector('label');
            label.classList.toggle('checked');
            const id = inputElm.getAttribute('id');
            handler(checked, id);
        });
    }
    addHanlderDelete(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target;
            if(!btn.classList.contains('btn--remove')) return;
            const id = e.target.getAttribute('data-todo');
            handler(id);
        });
    }
    _generateSingleMarkup(){
        return `
            <li class="todo--item todo-${this._data.id} " >
                <input type="checkbox" class="hidden-box" id="todo-${this._data.id}" />
                <label class="todo--label ${this._data.checked ? 'checked': ''}" for="todo-${this._data.id}">
                <span class="check--box"></span>
                <span class="check--text">${this._data.value}</span>
                <button class="btn--remove btn--${this._data.id}" data-todo="${this._data.id}" aria-label="Delete Todo Button"></button>
                </label>
            </li>
        `;

    }
    _generateAllMarkup(){
        const html = this._data.map(todo => {
            return `
            <li class="todo--item todo-${todo.id} " >
                <input type="checkbox" class="hidden-box" id="todo-${todo.id}" />
                <label class="todo--label ${todo.checked ? 'checked': ''}" for="todo-${todo.id}">
                <span class="check--box"></span>
                <span class="check--text">${todo.value}</span>
                <button class="btn--remove btn--${todo.id}" data-todo="${todo.id}" aria-label="Delete Todo Button"></button>
                </label>
            </li>
       `;
       }).join('');
       return html;
    }
}

export default new TodoView();