import {Server as SocketServer} from 'socket.io';
import { Server } from 'http';
import JWT_handler from '../Verification/JWT/Jwt';
import { save, checkUserConnected } from '../Storage/Redis/Index';
import { IMessageQuery } from "../../Database/Interfaces/Index"


class Socket {

    private io: SocketServer;
    private messageQuery: IMessageQuery;

    constructor(server: Server, message_query: IMessageQuery){
        this.io = new SocketServer(server, {});
        this.messageQuery = message_query;
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
                    save(payload.user_id, socket.id);
                }).catch(_ => {
                    socket.disconnect();
                });
            }else {
                socket.disconnect();
            }


            socket.on("newChat", (data: any) => {
                // const from = data.from;
                // const to = data.to;

                // save message in database
                this.messageQuery.saveMessage(data).then((msg: { getDataValue: (arg0: string) => any; }) => {
                    const userID = msg.getDataValue("to");
                    checkUserConnected(userID).then( socket_id => {
                        this.io.to(socket_id).emit('pvMessage', data);
                    })
                }).catch((err: any) => {
                    console.log(err)
                    // show error to sender
                })

                console.log(data);
            })

            socket.on("disconnecting", (reason: any) => {
                console.log(`disconnect: ${reason} and room: ${socket.room}`)
            })
            
        })
    }

}

export default Socket;