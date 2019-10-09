class Task{
    constructor(task,id){
        this.task = task;
        this.id = id;
    }
}

class UserInterface{

static displayAtStart(){
    const tasks=LocalStorage.getItem();
    tasks.forEach(el=>{

        taskList.innerHTML+= `<li data-value=${el.id}>${el.task}<a class=exit>x</a></li>`;
    })
}

static getTask(){
    return document.getElementById("task-input").value;
}
static addTask(){
    if(UserInterface.getTask()){
    const task = new Task(UserInterface.getTask());

    const listItem = document.createElement('li');
    listItem.textContent = task.task;
    listItem.classList.add("add-item");
    const deleteBtn = `<a href="#" class ="exit">x</a>`;
    if(taskList.firstElementChild){
        listItem.setAttribute("data-value",parseInt(taskList.lastElementChild.getAttribute('data-value'),10)+1);
    }
    else{
        listItem.setAttribute("data-value","0");
    }
    task.id = parseInt(listItem.getAttribute("data-value"),10);
    listItem.innerHTML+= deleteBtn;
    UserInterface.clearInput();
    taskList.appendChild(listItem);
    LocalStorage.addToLocalStorage(task);
    }
}

static clearInput(){
    return document.getElementById("task-input").value = '';
}

static deleteTask(e){
    if(e.target.classList.contains("exit")){
        e.target.parentElement.style.opacity = '0';
        setTimeout(()=>e.target.parentElement.remove(),100);
        LocalStorage.removeItem(parseInt(e.target.parentElement.getAttribute("data-value"),10))
    }
}

}

class LocalStorage{
    static getItem(){
        let task = localStorage.getItem('task');
        if(task){
            return JSON.parse(task);
        }
        task = [];
        return task;
    }
    static addToLocalStorage(taskObj){
        const task = LocalStorage.getItem();
        task.push(taskObj);
        localStorage.setItem('task',JSON.stringify(task));   
    }
    static removeItem(Objid){
        const task = LocalStorage.getItem();
        task.forEach((el,i)=>{
            if(el.id === Objid){
                task.splice(i,1);
            }
            localStorage.setItem('task',JSON.stringify(task));
        })
    }
}

const addTask = document.getElementById("add-task");
const taskList = document.querySelector(".task-list");

addTask.addEventListener('click',UserInterface.addTask);
taskList.addEventListener('click',UserInterface.deleteTask);
document.addEventListener('DOMContentLoaded',UserInterface.displayAtStart);