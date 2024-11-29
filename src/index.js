import { Task } from "./task-object";
import { Project } from "./project-object";
import { addTask } from "./display-task";
import { addNewProject, displayProjectContent, displayProjectList } from "./display-project";
import "boxicons";
import "./style.css";

function saveLocalStorage(_object, objectKey) {
    const objectJSON = JSON.stringify(_object);
    localStorage.setItem(objectKey, objectJSON);
}

let taskArray = [];
if (localStorage.getItem("taskArrayItems")) {
    let taskArrayStorage = JSON.parse(localStorage.getItem("taskArrayItems"));
    for (let taskIdx = 0; taskIdx < taskArrayStorage.length ; taskIdx++) {
        taskArray.push(new Task(
            taskArrayStorage[taskIdx]._title,
            taskArrayStorage[taskIdx]._description,
            taskArrayStorage[taskIdx]._notes,
            taskArrayStorage[taskIdx]._date,
            taskArrayStorage[taskIdx]._time,
            taskArrayStorage[taskIdx]._priority,
            taskArrayStorage[taskIdx]._project));
    }
}

const addTaskBtn = document.querySelector('#addTaskBtn');
addTaskBtn.addEventListener("click", () => {
    addTask(taskArray);
});

let projectArray = [];
if (!localStorage.getItem("projectArrayItems")) {
    projectArray.push(new Project("My Task List"));
} else {
    let projectArrayStorage = JSON.parse(localStorage.getItem("projectArrayItems"));
    for (let proIdx = 0; proIdx < projectArrayStorage.length; proIdx++) {
        projectArray.push(new Project(projectArrayStorage[proIdx]._proName, projectArrayStorage[proIdx]._colorTheme));
    }
}

displayProjectList(projectArray);

const addProjectBtn = document.querySelector('#addProjectBtn');
addProjectBtn.addEventListener("click", () => {
    addNewProject(projectArray);
    displayProjectList(projectArray);
});

displayProjectContent(projectArray, 0);

export { taskArray, projectArray, saveLocalStorage };