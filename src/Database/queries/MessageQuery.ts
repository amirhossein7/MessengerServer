import { IMessageQuery } from "../Interfaces";
import Message from "../models/Message";


class MessageQuery implements IMessageQuery {

    async saveMessage(params: any): Promise<Message> {
        return await Message.create(params);
    }

}

export default new MessageQuery();