let input = document.querySelector("input");
let btn = document.querySelector(".add-btn");
let newItem = document.querySelector(".task");
let del_all = document.querySelector(".btn-del");
let btn_comp = document.querySelector(".btn-comp");
let tasks = [];
function renderTask(taskObj) {
    let AddItem = document.createElement("li");
    let textSpan = document.createElement("span");
    textSpan.innerHTML = taskObj.text;
    if(taskObj.completed){
        textSpan.classList.add("completed-task");
    }
    AddItem.appendChild(textSpan);

    // Contaiener btns
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("task-buttons");

    // Delete Button
    let del_btn = document.createElement("button");
    del_btn.classList.add("delete-btn");
    del_btn.innerHTML = "Delete";
    btnContainer.appendChild(del_btn);

    // Complete Button
    let comp_btn = document.createElement("button");
    comp_btn.classList.add("comp-btn");
    comp_btn.innerHTML = "Complete";
    btnContainer.appendChild(comp_btn);

    // Button appent li
    AddItem.appendChild(btnContainer)
    // Screen par lagana
    newItem.appendChild(AddItem);

    // Delete Button ka Event
    del_btn.addEventListener("click", () => {
        AddItem.remove();
        tasks = tasks.filter((t)=> t !== taskObj.text);
        localStorage.setItem("tasksList", JSON.stringify(tasks));
    });

    // Complete Button ka Event
    comp_btn.addEventListener("click", () => {
        textSpan.classList.toggle("completed-task");
        taskObj.completed = textSpan.classList.contains("completed-task");
        localStorage.setItem("tasksList", JSON.stringify(tasks));
    });
}
(function () {
    let saveTask = JSON.parse(localStorage.getItem("tasksList"));
    if (saveTask !== null) {
        tasks = saveTask;
        saveTask.forEach((taskObj) => {
            renderTask(taskObj);
        })
    }
})();
btn.addEventListener("click", () => {
    let input_value = input.value;
    if (input_value !== "") {
        let newTaskObj = {text: input_value, completed: false};
        tasks.push(newTaskObj);
        localStorage.setItem("tasksList", JSON.stringify(tasks));
        
        renderTask(newTaskObj);

        input.value = "";
    } else {
        alert("Empty Box Please Someone Add Task");
    }
});
del_all.addEventListener("click", () => {
    localStorage.removeItem("tasksList");
    tasks.length = 0;
    newItem.innerHTML = "";
})
    btn_comp.addEventListener("click", () => {
        tasks.forEach((taskObj)=>{
            taskObj.completed = true;
        })
        localStorage.setItem("tasksList", JSON.stringify(tasks));
        newItem.innerHTML = "";
        tasks.forEach((taskObj)=>{
            renderTask(taskObj);
        })
    })