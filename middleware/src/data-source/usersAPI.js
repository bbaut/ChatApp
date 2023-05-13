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
        console.log(params)
        return this.get(
            `/api/users/userprofile`, {params}
        )
    };
    async requests(params) {
        console.log(params)
        return this.get(
            `/api/users/requests`, {params}
        )
    };

    //Pass username and email only
    async create(username,email){
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
        console.log(user)
        console.log(contact)
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
}

export default UsersAPI