import {Server as SocketServer} from 'socket.io';
import { Server } from 'http';


class Socket {

    private io: SocketServer;

    constructor(server: Server){
        this.io = new SocketServer(server, {});
        this.start();
    }

    private start() {        
        this.io.on('connection', (socket: any) => {
            console.log("socket connected");
            
        })
    }

}

export default Socket;