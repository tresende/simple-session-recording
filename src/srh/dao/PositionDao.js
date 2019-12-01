import Position from '../models/Position';

export class PositionDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'positions';
    }

    getAll() {
        return new Promise((resolve, reject) => {

            let positions = [];
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();


            cursor.onsuccess = e => {
                let current = e.target.result;
                if (current) {
                    const item = current.value;
                    positions.push(new Position(item.x, item.y));
                    current.continue();
                } else {
                    resolve(positions);
                }
            };

            cursor.onerror = e => {
                reject('Unable to list positions');
            };

        })
    }

    add(position) {
        if (!position.x || !position.y) return false;
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(position);

            request.onsuccess = (e) => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Unable to add position');
            };
        });
    }

    removeAll() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear()
            request.onsuccess = (e) => {
                resolve('Removed');
            };


            request.onerror = e => {
                console.log(e.target.error);
                reject('unable to delete positions');
            };

        })
    }
}