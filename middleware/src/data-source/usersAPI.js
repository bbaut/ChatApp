import { RESTDataSource } from "@apollo/datasource-rest";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.USERS_BASE_URL

class UsersAPI extends RESTDataSource {
    baseURL = URL

    constructor(options) {
        super(options);
        this.memoizeGetRequests;
    }

    async existance(params) {
        return this.get(
            `/api/users/searchcontact`, {params}
        )
    };
    async userData(params) {
        return this.get(
            `/api/users/userprofile`, {params}
        )
    };

    async idToUsername(params) {
        return this.get(
            `/api/users/idtousername`, {params}
        )
    }
    
    async requests(params) {
        return this.get(
            `/api/users/requests`, {params}
        )
    };


    async contact(params) {
        return this.get(
            `/api/users/contactData`,{params}
        )
    }

    //Pass username and email only
    async create(username,email,image){
        return this.post(
            '/api/users/createuser', {
                body: {
                    username,
                    email,
                    image  
                }
            }   
        )
    }

    async add(addObject){
        const user = addObject[0];
        const contact = addObject[1];
        return this.post(
            '/api/users/addcontact', {
                body: {
                    user,
                    contact
                }
            }
        )
    }

    async acceptContact(acceptObj){
        const user = acceptObj[0];
        const contact = acceptObj[1];
        return this.patch(
            '/api/users/acceptcontact', {
                body: {
                    user,
                    contact
                }
            }
        )
    }

    async deleteReq(deleteReqObj){
        const user = deleteReqObj[0];
        const contact = deleteReqObj[1];
        return this.post(
            '/api/users/deleterequest', {
                body: {
                    user,
                    contact
                }
            }
        )
    }
    
    async addChatContact(chatContactObj){
        const user = chatContactObj[0];
        const contact = chatContactObj[1];
        return this.post(
            '/api/users/addchatcontact', {
                body: {
                    user,
                    contact
                }
            }
        )
    }

    async addGroup(createdRoom){
        const {createdBy, members, groupName, _id} = createdRoom
        return this.post(
            '/api/users/addgroup', {
                body: {
                    createdBy,
                    members,
                    groupName,
                    _id
                }
            }
        )
    }
    async addMember(object){
        return this.post(
            '/api/users/addmember', {
                body: {
                    object
                }
            }
        )
    }
    async removeMember(object){
        return this.post(
            '/api/users/removemember', {
                body: {
                    object
                }
            }
        )
    }

    async deleteContact(deleteObj){
        const user = deleteObj[0];
        const contact = deleteObj[1];
        return this.post(
            'api/users/deletecontact', {
                body: {
                    user,
                    contact
                }
            }
        )
    }

    async chatRoom(chatObject){
        return this.post(
            'api/users/chatroom', {
                body: {
                    chatObject
                }
            }
        )
    }

    async checkChatUser (params) {
        return this.get(
            `/api/users/chatuser`,{params}
        )
    }
}

export default UsersAPI