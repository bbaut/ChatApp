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
}

export default UsersAPI