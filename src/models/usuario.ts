import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Prueba', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});

export default Usuario;