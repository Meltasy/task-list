class Project {
    constructor(proName, colorTheme) {
        this._proName = proName;
        this._colorTheme = colorTheme;
    }
    get proName() {
        return this._proName;
    }
    set proName(value) {
        return this._proName = value;
    }
    get colorTheme() {
        return this._colorTheme;
    }
    set colorTheme(value) {
        return this._colorTheme = value;
    }
}
export { Project };