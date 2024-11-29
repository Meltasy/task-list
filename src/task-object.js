class Task {
    constructor(title, description, notes, date, time, priority, project) {
        this._title = title;
        this._description = description;
        this._notes = notes;
        this._date = date;
        this._time = time;
        this._priority = priority;
        this._project = project;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get notes() {
        return this._notes;
    }
    set notes(value) {
        this._notes = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        return this._date = value;
    }
    get time() {
        return this._time;
    }
    set time(value) {
        return this._time = value;
    }
    get priority() {
        return this._priority;
    }
    set priority(value) {
        return this._priority = value;
    }
    get project() {
        return this._project;
    }
    set project(value) {
        return this._project = value;
    }
};

export { Task };