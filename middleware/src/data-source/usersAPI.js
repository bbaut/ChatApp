import { RESTDataSource } from "@apollo/datasource-rest";

class UsersAPI extends RESTDataSource {
    baseURL = 'http://localhost:4002/';

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

    //Pass username and email only
    async create(username,email){
        console.log(username,email)
        return this.post(
            '/api/users/createuser', {
                body: {
                    username,
                    email  
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
}

export default UsersAPI