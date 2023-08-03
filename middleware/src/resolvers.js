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
            const {email} = existanceInput;
            return await dataSources.usersAPI.existance({email});
        }, 

        async profileUserData (_,{userDataInput}, {dataSources, req, res}) {
            const {email} = userDataInput;
           
            const data = await dataSources.usersAPI.userData({email});
            return  data
        },

        async requestsContact (_,{requestsInput}, {dataSources, req, res}) {
            const {email} = requestsInput;
            return await dataSources.usersAPI.requests({email});
        },

        async contactData (_, {contactDataInput}, {dataSources, req, res}) {
            const {usernameArray} = contactDataInput;
            return await dataSources.usersAPI.contact(contactDataInput)
        },

        async getMessages (_, {getMessageInput}, {dataSources, req, res}) {
            return await dataSources.chatAPI.getAllMessages(getMessageInput);
        },

        async getRoom (_, {getRoomInput}, {dataSources, req, res}) {
            return await dataSources.chatAPI.getRoom(getRoomInput);
        },

        async getGroup (_, {getGroupInput}, {dataSources, req, res}) {
            return await dataSources.chatAPI.getGroup(getGroupInput);
        },
    },
    Mutation: {
        async registerUser(_, {registerInput}, {dataSources, req, res}) {

            const {username, email, password, confirmPassword, image} = registerInput;

            const isValidEmail = validate.isEmail(String(email).toLocaleLowerCase());

            if(password.length < 6) {
                throw new GraphQLError("Password incorrect length", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        http: { 
                            status: 400,
                            headers: "something happened"
                        },
                    },
                });
            }

            if (!isValidEmail || password !== confirmPassword) {
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
                console.log(username)
                const userUsers = await dataSources.usersAPI.create(username, email, image);
                const user = await dataSources.authAPI.register(registerInput);

                return user
            }
            catch(error){
                throw new GraphQLError(error.extensions.response.body.message);
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
                return auth;
            }
            catch(error){
                if (error.extensions.response.status === 403){
                    return res.status(403).json(error.extensions.response.body)
                }

                if(error.extensions.response.status === 404){
                    return res.status(404).json(error.extensions.response.body)
                }
            }
        },

        // USERS

        async addContact(_,{addInput},{dataSources, req, res}){
            const user = addInput[0];
            const contact = addInput[1];

            try {
                const contactUpdated = await dataSources.usersAPI.add(addInput);
                
                let contact = contactUpdated
                pubsub.publish("CONTACT_REQUEST", {
                    addContactRequest: contact
                })

                return contactUpdated;
            }
            catch (error){
                const message = error.extensions.response.body.msg;
                throw new GraphQLError(message);
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
                    acceptContactRequest: friendsArray
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
        },
        // CHAT

        async createMessage(_, {createMessageInput}, {dataSources, req, res}){
            try {
                const createdMessage = await dataSources.chatAPI.createMessage(createMessageInput);

                pubsub.publish("SEND_MESSAGE", {
                    sendMessage: createdMessage
                })

                return createdMessage;
              } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
              }
        },

        createChatRoom: async (_, { createRoomInput }, { dataSources }) => {
            try {
              const createdRoom = await dataSources.chatAPI.createChatRoom(createRoomInput);
              await dataSources.usersAPI.chatRoom(createdRoom);
               
              return createdRoom;
            } catch (err) {
              const message = err.extensions.response.body.error;
              throw new GraphQLError(message);
            }
        },

        createGroupRoom: async (_, { createGroupInput }, { dataSources }) => {
            try {
                const createdRoom = await dataSources.chatAPI.createGroupRoom(createGroupInput);
            
                const userUpdated = await dataSources.usersAPI.addGroup(createdRoom);
          
                pubsub.publish("CREATED_GROUP", {
                    createdGroup: userUpdated.userUpdated
                })

                return createdRoom;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },
        addMemberGroup: async (_, { addMemberInput }, { dataSources }) => {
            try {
                const userUpdated = await dataSources.usersAPI.addMember(addMemberInput);
                const chatUpdated = await dataSources.chatAPI.addMember(addMemberInput);
                
                pubsub.publish("ADDED_MEMBER", {
                    addedMember: userUpdated
                })

                return userUpdated;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },
        removeMemberGroup: async (_, { removeMemberInput }, { dataSources }) => {
            try {
                const userUpdated = await dataSources.usersAPI.removeMember(removeMemberInput);
                const chatUpdated = await dataSources.chatAPI.removeMember(removeMemberInput);

                pubsub.publish("REMOVED_MEMBER", {
                    removedMember: userUpdated
                })

                return userUpdated;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },
        deleteContact: async(_, {deleteContactInput}, {dataSources}) => {
            try {
                const users = await dataSources.usersAPI.deleteContact(deleteContactInput);

                const userUpdated = users.userUpdated
                const contactUpdated = users.contactUpdated

                let usersArray = [userUpdated, contactUpdated]

                pubsub.publish("DELETE_CONTACT", {
                    deleteContact: usersArray
                })

                return usersArray;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        }

    },
    Subscription: subscriptionsResolvers,
}

export default resolvers;