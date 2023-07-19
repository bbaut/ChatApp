import { RESTDataSource } from "@apollo/datasource-rest";

class AuthAPI extends RESTDataSource {
    baseURL = 'http://localhost:4001/';
    // baseURL = 'http://auth:4001/';

    constructor(options) {
        super(options);
        this.memoizeGetRequests;
    }
    async profile(token) {
        return this.get(
            `/api/auth/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    };

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

    async login({email, password}) {
        return this.post(
            `/api/auth/login`, { 
                body: {
                    email,
                    password 
                }
            }
        );
    }
}

export default AuthAPI