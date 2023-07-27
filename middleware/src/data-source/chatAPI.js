import { RESTDataSource } from "@apollo/datasource-rest";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.CHAT_BASE_URL

class ChatAPI extends RESTDataSource {
    baseURL = URL

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