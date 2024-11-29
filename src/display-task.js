import { Task } from "./task-object";
import { projectArray, saveLocalStorage } from "./index.js";
import { displayProjectContent } from "./display-project.js";
import { format } from "date-fns";

function makeDateInfoDialog() {
    const dateInfoDialog = document.createElement("dialog");
    dateInfoDialog.setAttribute("id", "dateInfoDialog");

    const dateLabel = document.createElement("label");
    const dateLabelText = document.createTextNode("Date:");
    dateLabel.setAttribute("for", "date");
    dateLabel.appendChild(dateLabelText);
    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "date");
    dateInput.setAttribute("name", "date");
    dateInput.setAttribute("required", "");
    dateInput.required = true;
    dateLabel.appendChild(dateInput);
    dateInfoDialog.appendChild(dateLabel);

    const timeLabel = document.createElement("label");
    const timeLabelText = document.createTextNode("Time:");
    timeLabel.setAttribute("for", "time");
    timeLabel.appendChild(timeLabelText);
    const timeInput = document.createElement("input");
    timeInput.setAttribute("type", "time");
    timeInput.setAttribute("id", "time");
    timeInput.setAttribute("name", "time");
    timeLabel.appendChild(timeInput);
    dateInfoDialog.appendChild(timeLabel);

    const closeButtons = document.createElement("div");
    const saveDateInfoBtn = document.createElement("button");
    saveDateInfoBtn.setAttribute("type", "submit");
    saveDateInfoBtn.setAttribute("id", "saveDateInfo");
    saveDateInfoBtn.textContent = "Save";
    closeButtons.appendChild(saveDateInfoBtn);

    const cancelDateInfoBtn = document.createElement("button");
    cancelDateInfoBtn.setAttribute("type", "button");
    cancelDateInfoBtn.textContent = "Cancel";
    cancelDateInfoBtn.addEventListener("click", () => {
        dateInfoDialog.remove();
    });
    closeButtons.appendChild(cancelDateInfoBtn);
    dateInfoDialog.appendChild(closeButtons);

    document.body.appendChild(dateInfoDialog);
    dateInfoDialog.showModal();
}

function addDateInfo(dateArray, timeArray) {
    makeDateInfoDialog();
    if (dateArray != []) {
        document.querySelector("#date").value = dateArray[0];
    }
    if (timeArray != []) {
        document.querySelector("#time").value = timeArray[0];
    }
    const saveDateInfoBtn = document.querySelector("#saveDateInfo");
    saveDateInfoBtn.addEventListener("click", (event) => {
        event.preventDefault();
        dateArray.pop();
        timeArray.pop();
        dateArray.push(document.querySelector("#date").value);
        timeArray.push(document.querySelector("#time").value);
        const dateInfoDialog = document.querySelector("#dateInfoDialog");
        dateInfoDialog.remove();
    });
}

function makePriorityDialog() {
    const priorityDialog = document.createElement("dialog");
    priorityDialog.setAttribute("id", "priorityDialog")
    const priorityList = document.createElement("ul");
    priorityList.setAttribute("id", "priorityList");

    const priority1 = document.createElement("li");
    const priority1Input = document.createElement("input");
    priority1Input.setAttribute("type", "radio");
    priority1Input.setAttribute("value", "Urgent");
    priority1Input.setAttribute("name", "priority");
    priority1.appendChild(priority1Input);
    const priority1Label = document.createElement("label");
    const priority1LabelText = document.createTextNode("Urgent");
    priority1Label.setAttribute("for", "priority");
    priority1Label.style.backgroundColor = "red";
    priority1Label.appendChild(priority1LabelText);
    priority1.appendChild(priority1Label);
    priorityList.appendChild(priority1);

    const priority2 = document.createElement("li");
    const priority2Input = document.createElement("input");
    priority2Input.setAttribute("type", "radio");
    priority2Input.setAttribute("value", "Important");
    priority2Input.setAttribute("name", "priority");
    priority2.appendChild(priority2Input);
    const priority2Label = document.createElement("label");
    const priority2LabelText = document.createTextNode("Important");
    priority2Label.setAttribute("for", "priority");
    priority2Label.style.backgroundColor = "orange";
    priority2Label.appendChild(priority2LabelText);
    priority2.appendChild(priority2Label);
    priorityList.appendChild(priority2);

    const priority3 = document.createElement("li");
    const priority3Input = document.createElement("input");
    priority3Input.setAttribute("type", "radio");
    priority3Input.setAttribute("value", "Soon");
    priority3Input.setAttribute("name", "priority");
    priority3.appendChild(priority3Input);
    const priority3Label = document.createElement("label");
    const priority3LabelText = document.createTextNode("Soon");
    priority3Label.setAttribute("for", "priority");
    priority3Label.style.backgroundColor = "yellow";
    priority3Label.appendChild(priority3LabelText);
    priority3.appendChild(priority3Label);
    priorityList.appendChild(priority3);

    const priority4 = document.createElement("li");
    const priority4Input = document.createElement("input");
    priority4Input.setAttribute("type", "radio");
    priority4Input.setAttribute("value", "Don't forget");
    priority4Input.setAttribute("name", "priority");
    priority4.appendChild(priority4Input);
    const priority4Label = document.createElement("label");
    const priority4LabelText = document.createTextNode("Don't forget");
    priority4Label.setAttribute("for", "priority");
    priority4Label.style.backgroundColor = "green";
    priority4Label.appendChild(priority4LabelText);
    priority4.appendChild(priority4Label);
    priorityList.appendChild(priority4);

    priorityDialog.appendChild(priorityList);

    const closeButtons = document.createElement("div");
    const savePriorityBtn = document.createElement("button");
    savePriorityBtn.setAttribute("type", "submit");
    savePriorityBtn.setAttribute("id", "savePriority");
    savePriorityBtn.textContent = "Save";
    closeButtons.appendChild(savePriorityBtn);

    const cancelPriorityBtn = document.createElement("button");
    cancelPriorityBtn.setAttribute("type", "button");
    cancelPriorityBtn.textContent = "Cancel";
    cancelPriorityBtn.addEventListener("click", () => {
        priorityDialog.remove();
    });
    closeButtons.appendChild(cancelPriorityBtn);
    priorityDialog.appendChild(closeButtons);

    document.body.appendChild(priorityDialog);
    priorityDialog.showModal();
}

function addPriority(priorityArray) {
    makePriorityDialog();
    if (priorityArray != []) {
        document.querySelectorAll('input[name="priority"]').forEach((checkbox) => {
            if (priorityArray[0] == checkbox.value) {
                checkbox.click();
            }
        });
    }
    const savePriorityBtn = document.querySelector("#savePriority");
    savePriorityBtn.addEventListener("click", (event) => {
        event.preventDefault();
        priorityArray.pop();
        document.querySelectorAll('input[name="priority"]:checked').forEach((checkbox) => {
            priorityArray.push(checkbox.value);
        });
        const priorityDialog = document.querySelector("#priorityDialog");
        priorityDialog.remove();
    });
}

function makeChangeProjectDialog() {
    const changeProjectDialog = document.createElement("dialog");
    changeProjectDialog.setAttribute("id", "changeProjectDialog");

    const projectList = document.createElement("ul");
    projectList.setAttribute("id", "projectList");
    for (let proIdx = 0; proIdx < projectArray.length; proIdx++) {
        let projectOption = document.createElement("li");
        let projectInput = document.createElement("input");
        projectInput.setAttribute("type", "radio");
        projectInput.setAttribute("name", "project");
        projectInput.setAttribute("value", `${projectArray[proIdx].proName}`);
        let projectOptionLabel = document.createElement("label");
        let projectOptionLabelText = document.createTextNode(`${projectArray[proIdx].proName}`);
        projectOptionLabel.setAttribute("for", "project");
        projectOptionLabel.appendChild(projectOptionLabelText);
        projectOption.appendChild(projectInput);
        projectOption.appendChild(projectOptionLabel);
        projectList.appendChild(projectOption);
    }
    changeProjectDialog.appendChild(projectList);

    const closeButtons = document.createElement("div");
    const saveChangeProjectBtn = document.createElement("button");
    saveChangeProjectBtn.setAttribute("type", "submit");
    saveChangeProjectBtn.setAttribute("id", "saveChangeProject");
    saveChangeProjectBtn.textContent = "Save";
    closeButtons.appendChild(saveChangeProjectBtn);

    const cancelChangeProjectBtn = document.createElement("button");
    cancelChangeProjectBtn.setAttribute("type", "button");
    cancelChangeProjectBtn.textContent = "Cancel";
    cancelChangeProjectBtn.addEventListener("click", () => {
        changeProjectDialog.remove();
    });
    closeButtons.appendChild(cancelChangeProjectBtn);
    changeProjectDialog.appendChild(closeButtons);

    document.body.appendChild(changeProjectDialog);
    changeProjectDialog.showModal();
}

function changeProject(projectSelectedArray) {
    makeChangeProjectDialog();
    document.querySelectorAll('input[name="project"]').forEach((checkbox) => {
        if (projectSelectedArray[0] == checkbox.value) {
            checkbox.click();
        }
    });
    const saveChangeProjectBtn = document.querySelector("#saveChangeProject");
    saveChangeProjectBtn.addEventListener("click", (event) => {
        event.preventDefault();
        projectSelectedArray.pop();
        document.querySelectorAll('input[name="project"]:checked').forEach((checkbox) => {
            projectSelectedArray.push(checkbox.value);
        });
        const changeProjectDialog = document.querySelector("#changeProjectDialog");
        changeProjectDialog.remove();
    });
}

function makeTaskDialog(dateArray, timeArray, priorityArray, projectSelectedArray) {
    const taskDialog = document.createElement("dialog");
    taskDialog.setAttribute("id", "taskDialog");

    const titleLabel = document.createElement("label");
    const titleLabelText = document.createTextNode("Title:");
    titleLabel.setAttribute("for", "title");
    titleLabel.appendChild(titleLabelText);
    taskDialog.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("required", "");
    titleInput.required = true;
    taskDialog.appendChild(titleInput);

    const descriptionLabel = document.createElement("label");
    const descriptionLabelText = document.createTextNode("Description:");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.appendChild(descriptionLabelText);
    taskDialog.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("id", "description");
    descriptionInput.setAttribute("name", "description");
    taskDialog.appendChild(descriptionInput);

    const notesLabel = document.createElement("label");
    const notesLabelText = document.createTextNode("Notes:");
    notesLabel.setAttribute("for", "notes");
    notesLabel.appendChild(notesLabelText);
    taskDialog.appendChild(notesLabel);

    const notesInput = document.createElement("textarea");
    notesInput.setAttribute("id", "notes");
    notesInput.setAttribute("name", "notes");
    notesInput.setAttribute("rows", "5");
    notesInput.setAttribute("cols", "30");
    taskDialog.appendChild(notesInput);

    const extraButtons = document.createElement("div");
    extraButtons.setAttribute("id", "extras");
    const addDateInfoBtn = document.createElement("button");
    addDateInfoBtn.setAttribute("type", "button");
    addDateInfoBtn.textContent = "Date";
    addDateInfoBtn.addEventListener("click", () => {
        addDateInfo(dateArray, timeArray);
    });
    extraButtons.appendChild(addDateInfoBtn);

    const addPriorityBtn = document.createElement("button");
    addPriorityBtn.setAttribute("type", "button");
    addPriorityBtn.textContent = "Priority";
    addPriorityBtn.addEventListener("click", () => {
        addPriority(priorityArray);
    });
    extraButtons.appendChild(addPriorityBtn);

    const changeProjectBtn = document.createElement("button");
    changeProjectBtn.setAttribute("type", "button");
    changeProjectBtn.textContent = "Project";
    changeProjectBtn.addEventListener("click", () => {
        changeProject(projectSelectedArray);
    });
    extraButtons.appendChild(changeProjectBtn);
    taskDialog.appendChild(extraButtons);

    const closeButtons = document.createElement("div");
    const saveTaskBtn = document.createElement("button");
    saveTaskBtn.setAttribute("type", "submit");
    saveTaskBtn.setAttribute("id", "saveTask");
    saveTaskBtn.textContent = "Save";
    closeButtons.appendChild(saveTaskBtn);

    const cancelTaskBtn = document.createElement("button");
    cancelTaskBtn.setAttribute("type", "button");
    cancelTaskBtn.textContent = "Cancel";
    cancelTaskBtn.addEventListener("click", () => {
        taskDialog.remove();
    });
    closeButtons.appendChild(cancelTaskBtn);
    taskDialog.appendChild(closeButtons);

    document.body.appendChild(taskDialog);
    taskDialog.showModal();
}

function saveTask(title, description, notes, dateArray, timeArray, priorityArray, projectSelectedArray, taskArray) {
    const newTask = new Task(title, description, notes, dateArray[0], timeArray[0], priorityArray[0], projectSelectedArray[0]);
    dateArray.pop();
    timeArray.pop();
    priorityArray.pop();
    projectSelectedArray.pop();
    taskArray.push(newTask);
}

function getCurrentProjectIdx(projectArray) {
    let name = document.querySelector("h1").textContent;
    for (let proIdx = 0; proIdx < projectArray.length; ++proIdx) {
        if (projectArray[proIdx].proName == name)
            return proIdx;
    }
    return -1;
}

function addTask(taskArray) {
    let dateArray = [];
    let timeArray = [];
    let priorityArray = [];
    let projectSelectedArray = ["My Task List"];
    makeTaskDialog(dateArray, timeArray, priorityArray, projectSelectedArray);
    const saveTaskBtn = document.querySelector("#saveTask");
    saveTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const notes = document.querySelector("#notes").value;
        if (title.length > 80) {
            alert("Title can't be more than 50 characters.");
            return false;
        }
        if (description.length > 150) {
            alert("Description can't be more than 100 characters.");
            return false;
        }
        if (notes.length > 300) {
            alert("Notes can't be more than 300 characters.");
            return false;
        }
        if (title === null || title === "") {
            alert("Please complete the title.");
            return false;
        }
        const taskDialog = document.querySelector("#taskDialog");
        taskDialog.remove();
        saveTask(title, description, notes, dateArray, timeArray, priorityArray, projectSelectedArray, taskArray);
        saveLocalStorage(taskArray, "taskArrayItems");
        displayProjectContent(projectArray, getCurrentProjectIdx(projectArray));
    });
}

function fillTaskDialog(task) {
    const title = document.querySelector("#title");
    title.value = `${task.title}`;
    const description = document.querySelector("#description");
    description.value = `${task.description}`;
    const notes = document.querySelector("#notes");
    notes.value = `${task.notes}`;
}

function editOldTask(title, description, notes, dateArray, timeArray, priorityArray, projectSelectedArray, task) {
    task.title = title;
    task.description = description;
    task.notes = notes;
    task.date = dateArray[0];
    task.time = timeArray[0];
    task.priority = priorityArray[0];
    task.project = projectSelectedArray[0];
};

function editTask(task, taskArray) {
    let dateArray = [];
    let timeArray = [];
    let priorityArray = [];
    let projectSelectedArray = [];
    dateArray.push(task.date);
    timeArray.push(task.time);
    priorityArray.push(task.priority);
    projectSelectedArray.push(task.project);
    makeTaskDialog(dateArray, timeArray, priorityArray, projectSelectedArray);
    fillTaskDialog(task);
    const saveTaskBtn = document.querySelector("#saveTask");
    saveTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const notes = document.querySelector("#notes").value;
        if (title.length > 80) {
            alert("Title can't be more than 50 characters.");
            return false;
        }
        if (description.length > 150) {
            alert("Description can't be more than 100 characters.");
            return false;
        }
        if (notes.length > 300) {
            alert("Notes can't be more than 300 characters.");
            return false;
        }
        if (title === null || title === "") {
            alert("Please complete the title.");
            return false;
        }
        const taskDialog = document.querySelector("#taskDialog");
        taskDialog.remove();
        editOldTask(title, description, notes, dateArray, timeArray, priorityArray, projectSelectedArray, task);
        saveLocalStorage(taskArray, "taskArrayItems");
        displayProjectContent(projectArray, getCurrentProjectIdx(projectArray));
    });
}

function deleteTask(taskArray, taskIdx) {
    taskArray.splice(taskIdx, 1);
    saveLocalStorage(taskArray, "taskArrayItems");
    displayProjectContent(projectArray, getCurrentProjectIdx(projectArray));
}

function makeTitle(task) {
    const title = document.createElement("h3");
    title.textContent = `${task.title}`;
    return title;
}

function makeDateInfo(task) {
    const dateInfo = document.createElement("p");
    if (task.date && task.time) {
        const dateFormat = format(new Date(task.date), "EEE do MMM");
        dateInfo.textContent = `on ${dateFormat}, at ${task.time}`;
    } else if (task.date && !task.time) {
        const dateFormat = format(new Date(task.date), "EEE do MMM");
        dateInfo.textContent = `on ${dateFormat}`;
    } else if (!task.date && task.time) {
        dateInfo.textContent = `at ${task.time}`;
    } else if (!task.date && !task.time) {
        dateInfo.textContent = "";
    }
    return dateInfo;
}

function makePriority(task) {
    const priority = document.createElement("div");
    if (task.priority == null) {
        return priority;
    }
    priority.setAttribute("class", "priority");
    if (task.priority == "Urgent") {
        priority.style.backgroundColor = "red";
    } else if (task.priority == "Important") {
        priority.style.backgroundColor = "orange";
    } else if (task.priority == "Soon") {
        priority.style.backgroundColor = "yellow";
    } else if (task.priority == "Don't forget") {
        priority.style.backgroundColor = "green";
    }
    priority.textContent = `${task.priority}`;
    return priority;
}

function displayTaskSummary(taskArray, taskIdx) {
    const task = taskArray[taskIdx];
    const eachTask = document.createElement("li");
    eachTask.setAttribute("id", "eachTask");
    const displayTaskBtn = document.createElement("button");
    displayTaskBtn.setAttribute("type", "button");
    displayTaskBtn.setAttribute("id", "displayTask");
    const title = makeTitle(task);
    const priority = makePriority(task);
    title.appendChild(priority);
    displayTaskBtn.appendChild(title);
    displayTaskBtn.appendChild(makeDateInfo(task));
    eachTask.appendChild(displayTaskBtn);
    displayTaskBtn.addEventListener("click", () => {
        editTask(task, taskArray);
    });

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.setAttribute("type", "button");
    deleteTaskBtn.setAttribute("id", "deleteTask");
    const deleteTaskIcon = document.createElement("box-icon");
    deleteTaskIcon.setAttribute("type", "solid");
    deleteTaskIcon.setAttribute("name", "x-circle");
    deleteTaskBtn.appendChild(deleteTaskIcon);
    eachTask.appendChild(deleteTaskBtn);
    deleteTaskBtn.addEventListener("click", () => {
        deleteTask(taskArray, taskIdx);
    });
    return eachTask;
}

export { addTask, displayTaskSummary };