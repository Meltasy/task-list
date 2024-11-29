import { Project } from "./project-object";
import { displayTaskSummary } from "./display-task";
import { taskArray, saveLocalStorage } from "./index.js";

function makeColorThemeDialog() {
    const colorThemeDialog = document.createElement("dialog");
    colorThemeDialog.setAttribute("id", "colorThemeDialog");
    const colorThemeList = document.createElement("ul");
    colorThemeList.setAttribute("id", "colorThemeList");

    const colorTheme1 = document.createElement("li");
    const colorTheme1Input = document.createElement("input");
    colorTheme1Input.setAttribute("type", "radio");
    colorTheme1Input.setAttribute("value", "green");
    colorTheme1Input.setAttribute("name", "colorTheme");
    colorTheme1.appendChild(colorTheme1Input);
    const colorTheme1Label = document.createElement("label");
    const colorTheme1LabelText = document.createTextNode("Green");
    colorTheme1Label.setAttribute("for", "colorTheme");
    colorTheme1Label.style.background = "linear-gradient(to right, #1A5B05, #68A38E)";
    colorTheme1Label.appendChild(colorTheme1LabelText);
    colorTheme1.appendChild(colorTheme1Label);
    colorThemeList.appendChild(colorTheme1);

    const colorTheme2 = document.createElement("li");
    const colorTheme2Input = document.createElement("input");
    colorTheme2Input.setAttribute("type", "radio");
    colorTheme2Input.setAttribute("value", "blue");
    colorTheme2Input.setAttribute("name", "colorTheme");
    colorTheme2.appendChild(colorTheme2Input);
    const colorTheme2Label = document.createElement("label");
    const colorTheme2LabelText = document.createTextNode("Blue");
    colorTheme2Label.setAttribute("for", "colorTheme");
    colorTheme2Label.style.background = "linear-gradient(to right, #0B1D48, #7B73A8)";
    colorTheme2Label.appendChild(colorTheme2LabelText);
    colorTheme2.appendChild(colorTheme2Label);
    colorThemeList.appendChild(colorTheme2);

    const colorTheme3 = document.createElement("li");
    const colorTheme3Input = document.createElement("input");
    colorTheme3Input.setAttribute("type", "radio");
    colorTheme3Input.setAttribute("value", "purple");
    colorTheme3Input.setAttribute("name", "colorTheme");
    colorTheme3.appendChild(colorTheme3Input);
    const colorTheme3Label = document.createElement("label");
    const colorTheme3LabelText = document.createTextNode("Purple");
    colorTheme3Label.setAttribute("for", "colorTheme");
    colorTheme3Label.style.background = "linear-gradient(to right, #290948, #9E659E)";
    colorTheme3Label.appendChild(colorTheme3LabelText);
    colorTheme3.appendChild(colorTheme3Label);
    colorThemeList.appendChild(colorTheme3);

    const colorTheme4 = document.createElement("li");
    const colorTheme4Input = document.createElement("input");
    colorTheme4Input.setAttribute("type", "radio");
    colorTheme4Input.setAttribute("value", "orange");
    colorTheme4Input.setAttribute("name", "colorTheme");
    colorTheme4.appendChild(colorTheme4Input);
    const colorTheme4Label = document.createElement("label");
    const colorTheme4LabelText = document.createTextNode("Orange");
    colorTheme4Label.setAttribute("for", "colorTheme");
    colorTheme4Label.style.background = "linear-gradient(to right, #6B2106, #F2C99B)";
    colorTheme4Label.appendChild(colorTheme4LabelText);
    colorTheme4.appendChild(colorTheme4Label);
    colorThemeList.appendChild(colorTheme4);

    colorThemeDialog.appendChild(colorThemeList);

    const closeButtons = document.createElement("div");
    const saveColorThemeBtn = document.createElement("button");
    saveColorThemeBtn.setAttribute("type", "submit");
    saveColorThemeBtn.setAttribute("id", "saveColorTheme");
    saveColorThemeBtn.textContent = "Save";
    closeButtons.appendChild(saveColorThemeBtn);

    const cancelColorThemeBtn = document.createElement("button");
    cancelColorThemeBtn.setAttribute("type", "button");
    cancelColorThemeBtn.textContent = "Cancel";
    cancelColorThemeBtn.addEventListener("click", () => {
        colorThemeDialog.remove();
    });
    closeButtons.appendChild(cancelColorThemeBtn);
    colorThemeDialog.appendChild(closeButtons);

    document.body.appendChild(colorThemeDialog);
    colorThemeDialog.showModal();
}

function addColorTheme(colorThemeArray) {
    makeColorThemeDialog();
    if (colorThemeArray != []) {
        document.querySelectorAll('input[name="colorTheme"]').forEach((checkbox) => {
            if (colorThemeArray[0] == checkbox.value) {
                checkbox.click();
            }
        });
    }
    const saveColorThemeBtn = document.querySelector("#saveColorTheme");
    saveColorThemeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        colorThemeArray.pop();
        document.querySelectorAll('input[name="colorTheme"]:checked').forEach((checkbox) => {
            colorThemeArray.push(checkbox.value);
        });
        const colorThemeDialog = document.querySelector("#colorThemeDialog");
        colorThemeDialog.remove();
    });
}

function makeProjectDialog(colorThemeArray) {
    const projectDialog = document.createElement("dialog");
    projectDialog.setAttribute("id", "projectDialog");

    const nameLabel = document.createElement("label");
    const nameLabelText = document.createTextNode("Name:");
    nameLabel.setAttribute("for", "proName");
    nameLabel.appendChild(nameLabelText);
    projectDialog.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "proName");
    nameInput.setAttribute("name", "proName");
    // nameInput.setAttribute("placeholder", "Name");
    nameInput.setAttribute("required", "");
    nameInput.required = true;
    projectDialog.appendChild(nameInput);

    const extraButtons = document.createElement("div");
    extraButtons.setAttribute("id", "extras");
    const addColorThemeBtn = document.createElement("button");
    addColorThemeBtn.setAttribute("type", "button");
    addColorThemeBtn.textContent = "Color Theme";
    addColorThemeBtn.addEventListener("click", () => {
        addColorTheme(colorThemeArray);
    });
    extraButtons.appendChild(addColorThemeBtn);
    projectDialog.appendChild(extraButtons);

    const closeButtons = document.createElement("div");
    const saveProjectBtn = document.createElement("button");
    saveProjectBtn.setAttribute("type", "submit");
    saveProjectBtn.setAttribute("id", "saveProject");
    saveProjectBtn.textContent = "Save";
    closeButtons.appendChild(saveProjectBtn);

    const cancelProjectBtn = document.createElement("button");
    cancelProjectBtn.setAttribute("type", "button");
    cancelProjectBtn.textContent = "Cancel";
    cancelProjectBtn.addEventListener("click", () => {
        projectDialog.remove();
    });
    closeButtons.appendChild(cancelProjectBtn);
    projectDialog.appendChild(closeButtons);

    document.body.appendChild(projectDialog);
    projectDialog.showModal();
}

function saveNewProject(proName, colorThemeArray, projectArray) {
    const newProject = new Project(proName, colorThemeArray[0]);
    colorThemeArray.pop();
    projectArray.push(newProject);
}

function addNewProject(projectArray) {
    let colorThemeArray = [];
    makeProjectDialog(colorThemeArray);
    const saveProjectBtn = document.querySelector("#saveProject");
    saveProjectBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const proName = document.querySelector("#proName").value;
        if (proName.length > 80) {
            alert("Name can't be more than 50 characters.");
            return false;
        }
        if (proName ===  null || proName === "") {
            alert("Please complete the project's name.");
            return false;
        }
        const projectDialog = document.querySelector("#projectDialog");
        projectDialog.remove();
        saveNewProject(proName, colorThemeArray, projectArray);
        saveLocalStorage(projectArray, "projectArrayItems");
        displayProjectList(projectArray);
    });
}

function fillProjectDialog(project) {
    const proName = document.querySelector("#proName");
    proName.value = `${project.proName}`;
}

function editOldProject(proName, colorThemeArray, project) {
    project.proName = proName;
    project.colorTheme = colorThemeArray[0];
};

function editProject(project, projectArray) {
    let colorThemeArray = [];
    colorThemeArray.push(project.colorTheme);
    makeProjectDialog(colorThemeArray);
    fillProjectDialog(project);
    const saveProjectBtn = document.querySelector("#saveProject");
    saveProjectBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const proName = document.querySelector("#proName").value;
        if (proName.length > 80) {
            alert("Name can't be more than 50 characters.");
            return false;
        }
        if (proName ===  null || proName === "") {
            alert("Please complete the name.");
            return false;
        }
        const projectDialog = document.querySelector("#projectDialog");
        projectDialog.remove();
        editOldProject(proName, colorThemeArray, project);
        saveLocalStorage(projectArray, "projectArrayItems");
        displayProjectList(projectArray);
    });
}

function deleteProject(projectArray, proIdx) {
    let projectName = projectArray[proIdx].proName;
    projectArray.splice(proIdx, 1);
    for (let taskIdx = 0; taskIdx < taskArray.length; taskIdx++) {
        if (taskArray[taskIdx].project == projectName) {
            taskArray.splice(taskIdx, 1);
            taskIdx = taskIdx-1;
        }
    }
    saveLocalStorage(taskArray, "taskArrayItems");
    saveLocalStorage(projectArray, "projectArrayItems");
    displayProjectList(projectArray);
}

function displayProjectContent(projectArray, proIdx) {
    const projectContent = document.querySelector("#projectContent");
    while (projectContent.hasChildNodes()) {
        projectContent.removeChild(projectContent.lastChild);
    }
    const classList = document.body.classList;
    while (classList.length > 0) {
        classList.remove(classList.item(0));
    }
    classList.toggle(projectArray[proIdx].colorTheme);
    const projectHeading = document.createElement("h1");
    projectHeading.textContent = `${projectArray[proIdx].proName}`;
    const makeList = document.createElement("div");
    const taskList = document.createElement("ul");
    for (let taskIdx = 0; taskIdx < taskArray.length; taskIdx++) {
        if (taskArray[taskIdx].project == projectArray[proIdx].proName) {
            taskList.appendChild(displayTaskSummary(taskArray, taskIdx));
        }
    }
    makeList.appendChild(taskList);
    projectContent.appendChild(projectHeading);
    projectContent.appendChild(makeList);
}

function displayProjectSummary(projectArray, proIdx) {
    const project = projectArray[proIdx];
    const eachProject = document.createElement("div");
    eachProject.setAttribute("id", "eachProject");
    const displayProjectBtn = document.createElement("button");
    displayProjectBtn.setAttribute("type", "button");
    displayProjectBtn.textContent = `${project.proName}`;
    eachProject.appendChild(displayProjectBtn);
    displayProjectBtn.addEventListener("click", () => {
        displayProjectContent(projectArray, proIdx);
    });

    const projectButtons = document.createElement("div");
    const editProjectBtn = document.createElement("button");
    editProjectBtn.setAttribute("type", "button");
    editProjectBtn.setAttribute("id", "editProject");
    const editProjectIcon = document.createElement("box-icon");
    editProjectIcon.setAttribute("type", "solid");
    editProjectIcon.setAttribute("name", "pencil");
    editProjectBtn.appendChild(editProjectIcon);
    projectButtons.appendChild(editProjectBtn);
    editProjectBtn.addEventListener("click", () => {
        editProject(project, projectArray);
    });

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.setAttribute("type", "button");
    deleteProjectBtn.setAttribute("id", "deleteProject");
    const deleteProjectIcon = document.createElement("box-icon");
    deleteProjectIcon.setAttribute("type", "solid");
    deleteProjectIcon.setAttribute("name", "x-circle");
    deleteProjectBtn.appendChild(deleteProjectIcon);
    projectButtons.appendChild(deleteProjectBtn);
    deleteProjectBtn.addEventListener("click", () => {
        deleteProject(projectArray, proIdx);
    });
    eachProject.appendChild(projectButtons);

    return eachProject;
}

function displayProjectList(projectArray) {
    const projectList = document.querySelector("#projectList");
    while (projectList.hasChildNodes()) {
        projectList.removeChild(projectList.firstChild);
    }
    for (let proIdx = 0; proIdx < projectArray.length; proIdx++) {
        projectList.appendChild(displayProjectSummary(projectArray, proIdx));
    }
}

export { addNewProject, displayProjectContent, displayProjectList };