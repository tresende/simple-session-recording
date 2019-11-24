import { ConnectionFactory } from '../dao/ConnectionFactory';
import { PositionDao } from '../dao/PositionDao';

export class PositionService {
    add(position) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new PositionDao(connection))
            .then(dao => dao.add(position))
            .then(() => 'Position successfully registered')
            .catch(erro => {
                throw new Error("Unable to add position")
            });
    }
}