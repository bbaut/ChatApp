import { GraphQLError } from "graphql";
import validate from "validator";
import pubsub from "./pubsub.js";
import subscriptionsResolvers from "./subscriptions.js";

const resolvers = {
    Query: {
        async profileUser (_,{profileInput}, {dataSources, req, res}) {
            const {token} = profileInput;
            return await dataSources.authAPI.profile(token);
        },

        async existanceContact (_,{existanceInput}, {dataSources, req, res}) {
            console.log(req)
            const {email} = existanceInput;
            return await dataSources.usersAPI.existance({email});
        }, 

        async profileUserData (_,{userDataInput}, {dataSources, req, res}) {
            console.log(req)
            const {email} = userDataInput;
            return await dataSources.usersAPI.userData({email});
        }, 

        async requestsContact (_,{requestsInput}, {dataSources, req, res}) {
            const {email} = requestsInput;
            return await dataSources.usersAPI.requests({email});
        },
    },
    Mutation: {
        async registerUser(_, {registerInput}, {dataSources, req, res}) {
            const {username, email, password, confirmPassword} = registerInput;

            const isValidEmail = validate.isEmail(String(email).toLocaleLowerCase());

            if (!isValidEmail || password !== confirmPassword || password.length < 6) {
                throw new GraphQLError("Internal Error", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        http: { 
                            status: 400,
                            headers: "something happened"
                        },
                    },
                });
            }

            try {
                console.log(registerInput)
                const userUsers = await dataSources.usersAPI.create(username, email);
                const user = await dataSources.authAPI.register(registerInput);

                return user
            }
            catch(error){
                console.log(error)
            }
        },

        async loginUser(_, {loginInput}, {dataSources, req, res}){
            const {email, password} = loginInput;

            const isValidEmail = validate.isEmail(String(email).toLocaleLowerCase());

            if (!isValidEmail) {
                throw new GraphQLError("Internal Error", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        http: { 
                            status: 400,
                            headers: "something happened"
                        },
                    },
                });
            }

            try {
                const auth = await dataSources.authAPI.login(loginInput);
                const {token} = auth;
                console.log(token)

                // const options = {
                //     maxAge: 1e9,
                //     httpOnly: true,
                //     secure: true,
                //     sameSite: "none",
                //   };
            
                // res.cookie("JWT", token, options);
                return auth;
            }
            catch(error){
                console.log(error);
            }
        },

        // USERS

        async addContact(_,{addInput},{dataSources, req, res}){
            const user = addInput[0];
            const contact = addInput[1];

            try {
                const contactUpdated = await dataSources.usersAPI.add(addInput);
                
                const body = addInput
                pubsub.publish("CONTACT_REQUEST", {
                    addContactRequest: body
                })

                return contactUpdated;
            }
            catch (error){
                console.log(error);
            }
        },

        async acceptContact(_,{acceptContactInput}, {dataSources, req, res}){
            try {
                const friends = await dataSources.usersAPI.acceptContact(acceptContactInput);
                
                const userUpdated = friends.userUpdated;
                const contactUpdated = friends.contactUpdated
                
                let friendsArray = [userUpdated, contactUpdated]

                const body = acceptContactInput
                pubsub.publish("ACCEPT_CONTACT_REQUEST", {
                    acceptContactRequest: body
                })
                return friendsArray;
            }
            catch(error){
                console.log(error);
            }
        },

        async deleteRequest(_,{deleteReqInput}, {dataSources, req, res}){
            try {
                const contactUpdated = await dataSources.usersAPI.deleteReq(deleteReqInput);
                return contactUpdated;
            }
            catch(error){
                console.log(error);
            }
        }
    },
    Subscription: subscriptionsResolvers,
}

export default resolvers;