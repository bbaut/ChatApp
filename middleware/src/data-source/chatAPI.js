import { RESTDataSource } from "@apollo/datasource-rest";

class ChatAPI extends RESTDataSource {
    baseURL = 'http://localhost:4003/';
    // baseURL = 'http://chat:4003/';

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

    async createGroupRoom (roomObject) {
        return this.post(
            '/api/chat/creategrouproom', {
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

    async getAllMessages (params) {
        return this.get(
            '/api/chat/getmessages', {params}
        )
    }

    async getRoom (params) {
        return this.get(
            '/api/chat/getroom', {params}
        )
    }
    async getGroup (params) {
        return this.get(
            '/api/chat/getgroup', {params}
        )
    }
    async addMember (object) {
        return this.post(
            '/api/chat/addmember', {
                body: {
                    object
                }
            }
        )
    }
    async removeMember (object) {
        return this.post(
            '/api/chat/removemember', {
                body: {
                    object
                }
            }
        )
    }

}

export default ChatAPI;