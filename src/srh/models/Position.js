export default class Position {

    constructor(x, y) {
        this._x = x;
        this._y = y;
        Object.freeze(this);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}