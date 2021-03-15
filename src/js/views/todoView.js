import View from './view.js';

class TodoView extends View{
    constructor(){
        super();
        this._parentElement = document.querySelector('.todo--list');
        this._data;
        this._count = 1;
    }
    addHandlerRender(handler){
        window.addEventListener('load', handler);
    }
    addHanlderCheck(handler){
        this._parentElement.addEventListener('change', function(e){
            const checked = e.target.closest('input').checked;
            const id = e.target.closest('input').getAttribute('id');
            console.log(checked);
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
    _generateAllMarkup(){
        console.log(this._data);
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
       this._count = this._data.length + 1;
       return html;
    }
}

export default new TodoView();