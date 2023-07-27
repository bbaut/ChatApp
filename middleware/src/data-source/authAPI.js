import { RESTDataSource } from "@apollo/datasource-rest";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.AUTH_BASE_URL

class AuthAPI extends RESTDataSource {
    baseURL = URL

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