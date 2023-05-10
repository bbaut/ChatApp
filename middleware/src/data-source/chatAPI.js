import { RESTDataSource } from "@apollo/datasource-rest";

class ChatAPI extends RESTDataSource {
    baseURL = 'http://localhost:4002/';

    constructor(options) {
        super(options);
        this.memoizeGetRequests;
    }

    async createChatRoom (roomObject) {
        return this.post(
            '/api/chat/createchatroom', {
                body: roomObject
            }
        )
    }

    async createMessage (messageObject) {
        return this.post(
            '/api/chat/createmessage', {
                body: messageObject
            }
        )
    };

}

export default ChatAPI;