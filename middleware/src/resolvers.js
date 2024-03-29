import { GraphQLError } from "graphql";
import validate from "validator";
import pubsub from "./pubsub.js";
import subscriptionsResolvers from "./subscriptions.js";

const resolvers = {
    Query: {
        async profileUser (_,{profileInput}, {dataSources, req, res}) {
            const {token} = profileInput;
            const user =  await dataSources.authAPI.profile(token);
            return user
        },

        async existanceContact (_,{existanceInput}, {dataSources, req, res}) {
            const {email} = existanceInput;
            try {
                const data = await dataSources.usersAPI.existance({email})
                return data;
            } catch (error) {
                let errorMsg = error.extensions.response.body.msg
                throw new GraphQLError(errorMsg, {
                    extensions: {
                        code: "NOT_FOUND",
                        http: { 
                            status: 404,
                            headers: "something happened"
                        },
                    },
                });
            }
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

        async getMessages (_, {getMessageInput}, {dataSources, authUser, req, res}) {
            getMessageInput["from"] = authUser.username;
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
                throw new GraphQLError(error.extensions.response.body.msg)
                // if (error.extensions.response.status === 403){
                //     throw new GraphQLError(error.extensions.response.body.msg);
                // }

                // if(error.extensions.response.status === 404){
                //     throw new GraphQLError(error.extensions.response.body.msg);
                // }
            }
        },

        // USERS

        async addContact(_,{addInput},{dataSources, authUser, req, res}){
            if(addInput.email === authUser.email) {
                throw new GraphQLError("Action not allowed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        http: { 
                            status: 400,
                            headers: "something happened"
                        },
                    },
                });
            }

            let usersEmail = [{email: authUser.email},{email: addInput.email}]

            try {
                const contactUpdated = await dataSources.usersAPI.add(usersEmail);
                
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

        async acceptContact(_,{acceptContactInput}, {dataSources, authUser, req, res}){
            let users = [{username: acceptContactInput.username}, {username: authUser.username}]
            try {
                const friends = await dataSources.usersAPI.acceptContact(users);
                
                const userUpdated = friends.userUpdated;
                const contactUpdated = friends.contactUpdated
                
                let friendsArray = [userUpdated, contactUpdated]

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

        async createMessage(_, {createMessageInput}, {dataSources, authUser, req, res}){
            try {
                const chatIdentifier = createMessageInput.chatId;
                const senderEmail = authUser.email;
                const senderUsername = authUser.username;   

                const room = await dataSources.chatAPI.getRoom({id : chatIdentifier});

                if(room){
                    const data = await dataSources.usersAPI.userData({email: senderEmail});
 
                    if(!data.contacts.includes(room.member) && !data.contacts.includes(room.createdBy) ){
                        return;
                    }                    
                }

                const usernamesArray = await dataSources.usersAPI.checkChatUser({chatIdentifier});

                if(!usernamesArray.includes(senderUsername)){
                    return;
                }

                const authUserObject = { sender: senderUsername };

                const messageObject = {...createMessageInput, ...authUserObject};

                const createdMessage = await dataSources.chatAPI.createMessage(messageObject);

                pubsub.publish("SEND_MESSAGE", {
                    sendMessage: createdMessage
                })
                return createdMessage;
              } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
              }
        },

        createChatRoom: async (_, { createRoomInput }, { dataSources, authUser }) => {
            createRoomInput["createdBy"] = authUser.username;
            try {
              const createdRoom = await dataSources.chatAPI.createChatRoom(createRoomInput);
              await dataSources.usersAPI.chatRoom(createdRoom);
               
              return createdRoom;
            } catch (err) {
              const message = err.extensions.response.body.error;
              throw new GraphQLError(message);
            }
        },

        createGroupRoom: async (_, { createGroupInput }, { dataSources, authUser }) => {
            createGroupInput["createdBy"] = authUser.username;
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
        addMemberGroup: async (_, { addMemberInput }, { dataSources, authUser }) => {
            if(authUser.username === addMemberInput.member) {
                return res.status(500)
            }

            addMemberInput["username"] = authUser.username;
            try {
                const userUpdated = await dataSources.usersAPI.addMember(addMemberInput);
                const chatUpdated = await dataSources.chatAPI.addMember(addMemberInput);
                
                pubsub.publish("ADDED_MEMBER", {
                    addedMember: userUpdated,
                    chatUpdated: chatUpdated
                })

                return userUpdated;
            } catch (err) {
                const message = err.extensions.response.body.error;
                throw new GraphQLError(message);
            }
        },
        removeMemberGroup: async (_, { removeMemberInput }, { dataSources, authUser }) => {

            if(authUser.username === removeMemberInput.member){
                return res.status(500)
            }

            if(!removeMemberInput.member){
                const authUsernameObj = {member: authUser.username};
                removeMemberInput = {...removeMemberInput, ...authUsernameObj} 
            }

            try {
                const userUpdated = await dataSources.usersAPI.removeMember(removeMemberInput);
                const chatUpdated = await dataSources.chatAPI.removeMember(removeMemberInput);
                
                pubsub.publish("REMOVED_MEMBER", {
                    removedMember: userUpdated,
                    chatUpdated: chatUpdated
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