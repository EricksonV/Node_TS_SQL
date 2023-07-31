import { Sequelize } from 'sequelize';

const valores = {
    bd: process.env.BD ?? 'undefined',
    user: process.env.USER || 'undefined',
    password: process.env.PASSWORD || undefined,
    host: process.env.host || undefined
}

const db = new Sequelize(valores.bd, valores.user,valores.password, {
    host: valores.host,
    dialect: 'mssql',
    timezone: '-06:00',
    logging: false
});

export default db;