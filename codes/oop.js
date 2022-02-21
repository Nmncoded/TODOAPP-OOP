function main(){
let input = document.querySelector(`#text`);
let ul = document.querySelector(`ul`);
let itemsLeft = document.querySelector(`.itemsleft`).firstElementChild;
let icon = document.querySelector(`.icon i`);
let all = document.querySelector(`.all`);
let active = document.querySelector(`.active`);
let completed = document.querySelector(`.completed`);
let clrCmplted = document.querySelector(`.clear`);
let footer = document.querySelector(`footer`);
let isActive = "all";
let isclrcmp = "all";


/*<li class="li">
    <div class="name">
        <input type="checkbox" />
        <p>Learn about DOM</p>
    </div>
    <span>X</span>
    </li>
*/



class TodoList {
    constructor(rootElm, list = []) {
        this.todos = list;
        this.rootElm = rootElm;
    }
    add(text) {
        let todo = new Todo(text);
        this.todos.push(todo);
        this.createUI();
        return this.todos.length;
    }
    handleDelete(id) {
        let index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1);
        if (this.showClearBtn()) {
            clrCmplted.innerText = `Clear completed`
        } else {
            clrCmplted.innerText = "";
        };
        this.createUI();
        this.addFooter(this.todos);
        return this.todos.length;
    }
    itemLeft() {
        let cloneTodos = [];
        this.todos.filter(todo => {
            if (todo.isDone === false) {
                cloneTodos.push(todo);
            }
        })
        return itemsLeft.innerText = cloneTodos.length;
    }
    handleIconClick() {
        if (this.changeIsDone()) {
            this.todos = this.todos.map(todo => { todo.isDone = false; return todo });
        } else {
            this.todos = this.todos.map(todo => { todo.isDone = true; return todo });
        }
        if (this.showClearBtn()) {
            clrCmplted.innerText = `Clear completed`
        } else {
            clrCmplted.innerText = "";
        }
        this.createUI();
    }
    changeIsDone() {
        return this.todos.every(todo => (todo.isDone === true))
    }
    handleAllTodos() {
        isclrcmp = "all";
        isActive = "all";
        this.todos = this.todos.map(todo => todo);
        this.updateColorOfBtn(isActive);
        this.createUI();
    }
    handleActiveTodos() {
        isActive = "active";
        let cloneTodos = [...this.todos];
        cloneTodos = cloneTodos.filter(todo => !todo.isDone);
        this.updateColorOfBtn(isActive);
        this.createUI(ul, cloneTodos);
    }
    handleCompletedTodos() {
        isclrcmp = "completed";
        isActive = "completed";
        let cloneTodos = [];
        cloneTodos = this.todos.filter(todo => todo.isDone);
        this.updateColorOfBtn(isActive);
        this.createUI(ul, cloneTodos);
    }
    handleClrCmpltdClick() {
        this.todos = this.todos.filter(todo => !todo.isDone)
        if (this.showClearBtn()) {
            clrCmplted.innerText = `Clear completed`
        } else {
            clrCmplted.innerText = "";
        }
        this.addFooter(this.todos);
        if (isclrcmp === "completed") {
            this.handleCompletedTodos();
        } else {
            this.handleAllTodos();
        }
    }
    showClearBtn() {
        return this.todos.some(todo => todo.isDone === true)
    }
    addFooter() {
        if (this.todos.length === 0) {
            footer.classList.add(`footer`);
        } else {
            footer.classList.remove(`footer`)
        }
        this.itemLeft(this.todos);
    }
    updateColorOfBtn(color){
        all.classList.remove(`colorBtn`);
        active.classList.remove(`colorBtn`);
        completed.classList.remove(`colorBtn`);
    
        if(color === "all"){
            all.classList.add(`colorBtn`)
        };
        if(color === "active"){
            active.classList.add(`colorBtn`)
        };
        if(color === "completed"){
            completed.classList.add(`colorBtn`)
        }
    }
    createUI(root = this.rootElm, data = this.todos) {
        root.innerHTML = "";
        data.forEach((todo) => {
            // console.log(todo);
            let ui = todo.createUI();
            ui.querySelector(`span`).addEventListener(`click`, this.handleDelete.bind(this, todo.id))
            // console.log(`nmn1`)
            root.append(ui);
        })
        this.itemLeft();
        this.addFooter(data);
    }
}


class Todo {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.id = `id-${Date.now()}`;
    }
    handleCheck() {
        this.isDone = !this.isDone;
        if (myTodo.showClearBtn()) {
            clrCmplted.innerText = `Clear completed`
        } else {
            clrCmplted.innerText = "";
        }
        if (isActive === "active") {
            myTodo.handleActiveTodos();
        } else if (isActive === "completed") {
            myTodo.handleCompletedTodos();
        } else {
            myTodo.handleAllTodos();
        };
        myTodo.itemLeft();
    }
    createUI() {
        let li = document.createElement(`li`);
        li.classList.add(`li`);
        let div = document.createElement(`div`);
        div.classList.add(`name`);
        let inputCheck = document.createElement(`input`);
        inputCheck.type = "checkbox";
        inputCheck.checked = this.isDone;
        inputCheck.addEventListener(`input`, this.handleCheck.bind(this));
        let p = document.createElement(`p`);
        p.innerText = this.text;
        let span = document.createElement(`span`);
        span.classList.add(`spantext`);
        span.innerText = "x";
        div.append(inputCheck, p);
        li.append(div, span);
        return li;
    }
}

var myTodo = new TodoList(ul);
myTodo.addFooter();
myTodo.updateColorOfBtn(isActive);


input.addEventListener("keyup", (event) => {
    if ((event.keyCode === 13) && (event.target.value !== "")) {
        myTodo.add(event.target.value);
        event.target.value = "";
    }
    if (myTodo.showClearBtn()) {
        clrCmplted.innerText = `Clear completed`
    } else {
        clrCmplted.innerText = "";
    };
    if (isActive === "active") {
        myTodo.handleActiveTodos();
    } else if (isActive === "completed") {
        myTodo.handleCompletedTodos();
    } else {
        myTodo.handleAllTodos();
    };
})


icon.addEventListener(`click`, () => {
    myTodo.handleIconClick();
})
all.addEventListener(`click`, () => {
    myTodo.handleAllTodos()
});
active.addEventListener(`click`, () => {
    myTodo.handleActiveTodos()
});
completed.addEventListener(`click`, () => {
    myTodo.handleCompletedTodos()
});
clrCmplted.addEventListener(`click`, () => {
    myTodo.handleClrCmpltdClick()
});
}
main();