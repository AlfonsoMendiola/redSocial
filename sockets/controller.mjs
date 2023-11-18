//const { Socket } = require('socket.io')
import { Socket } from "socket.io";

const socketController = (socket = new Socket) => {
    console.log(`cliente conectado: ${socket.id}`);
}

//module.exports = { socketController }
export { socketController }