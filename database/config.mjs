import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';

const dbSequelize = new Sequelize(`${process.env.MYSQL_DB_NAME}`, `${process.env.MYSQL_USERNAME}`, `${process.env.MYSQL_PASS}`, {
    host: process.env.MYSQL_SERVER,
    dialect: 'mysql'
})

const sqlConnection = async() => {
    try {
        await dbSequelize.authenticate();
        console.log('MySQL en linea');
    } catch (error) {
        console.log(`${error}`);
        throw new Error('Error al conectar en MySQL');
    }
}

const mongoConnection = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_SERVER}`);
        console.log('MongoDB en linea');
    } catch (error) {
        console.log(`${error}`);
        throw new Error('Error al conectar en mongoDB');
    }
}

export {mongoConnection, sqlConnection, dbSequelize}