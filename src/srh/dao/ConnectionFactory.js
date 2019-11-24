
const stores = ['positions'];
const dbName = 'srh';
var connection = null;
var close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Unable to Create ConnectionFactory Instances');
    }

    static closeConnection() {

        if (connection) {
            Reflect.apply(close, connection, [])
            connection = null;
        }
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error('You cannot close the connection directly.');
                    };
                }
                resolve(connection);
            }
            openRequest.onerror = e => {
                reject(e.target.error.name);
            };
        });
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }
}