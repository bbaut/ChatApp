import { RESTDataSource } from "@apollo/datasource-rest";

class UsersAPI extends RESTDataSource {
    baseURL = 'http://localhost:4002/';

    constructor(options) {
        super(options);
        this.memoizeGetRequests;
    }

    async existance(params) {
        console.log(params)
        return this.get(
            `/api/users/searchcontact`, {params}
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
}

export default UsersAPI