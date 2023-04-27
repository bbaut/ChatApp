import { RESTDataSource } from "@apollo/datasource-rest";

class AuthAPI extends RESTDataSource {
    baseURL = 'http://localhost:4002/';

    constructor(options) {
        super(options);
        this.memoizeGetRequests;
    }

    async register({username,email,password}){
        return this.post(
            '/api/auth/register', {
                body: {
                    username,
                    email,
                    password    
                }
            }   
        )
    }
}

export default AuthAPI