import {Server as SocketServer} from 'socket.io';
import { Server } from 'http';
import JWT_handler from '../Verification/JWT/Jwt';
import { client as redisClient } from '../Storage/Redis/Index';


class Socket {

    private io: SocketServer;

    constructor(server: Server){
        this.io = new SocketServer(server, {});
        this.start();
    }

    private start() {        
        this.io.on('connection', (socket: any) => {
            console.log(`socket connected ... (${socket.id})`);

            // Verify connection
            const headers = socket.handshake.headers;
            const bearerHeader = headers['authorization'];
            if(typeof bearerHeader !== 'undefined') {
                JWT_handler.verify(bearerHeader).then((payload) => {
                    redisClient.set(payload.user_id, socket.id);
                }).catch(_ => {
                    socket.disconnect();
                });
            }else {
                socket.disconnect();
            }


            socket.on("newChat", (data: any) => {
                console.log(data);
                
            })

            socket.on("disconnecting", (reason: any) => {
                console.log(`disconnect: ${reason} and room: ${socket.room}`)
            })
            
        })
    }

}

export default Socket;