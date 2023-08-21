import { withFilter } from "graphql-subscriptions";
import pubsub from "./pubsub.js";

const subscriptions = {
        addContactRequest: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("CONTACT_REQUEST"),
                async ({addContactRequest}, _, {dataSources, authUser}) => {
                    if(addContactRequest.username === authUser.username) {
                        return true
                    }
                }
            )
        },
        acceptContactRequest: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("ACCEPT_CONTACT_REQUEST"),
                async ({acceptContactRequest}, _, {dataSources, authUser}) => {
                    let usernamesArray = acceptContactRequest.map((user) => {
                        return user.username
                    })
                    if (usernamesArray.includes(authUser.username)){
                        return true
                    }
                }
            )
        },
        sendMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("SEND_MESSAGE"),
                async ({sendMessage}, _, {dataSources, authUser}) => {

                    let chatIdentifier = sendMessage.chatId
                    let usernamesArray = await dataSources.usersAPI.checkChatUser({chatIdentifier})
                    
                    if (usernamesArray.includes(authUser.username)){
                        return true
                    }
                } 
            )
        },
        createdGroup: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("CREATED_GROUP"),
                async ({createdGroup}, _, {dataSources, authUser}) => {
                    if(createdGroup.username === authUser.username) {
                        return true
                    }
                }   
            )
        },
        addedMember: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("ADDED_MEMBER"),
                async({addedMember, chatUpdated}, _, {dataSources, authUser}) => {
                    let membersArray = chatUpdated.members;
                    console.log(membersArray)
                    console.log(authUser)
                    if(membersArray.includes(authUser.username)){
                        return true
                    }
                }
            )
        },
        removedMember: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("REMOVED_MEMBER"),
                async ({removedMember, chatUpdated}, _, {dataSources, authUser}) => {
                    let membersArray = chatUpdated.members;
                    if(membersArray.includes(authUser.username) || removedMember.username === authUser.username){
                        return true
                    }
                    // if(removedMember.username === authUser.username) {
                    //     return true
                    // }
                }
            )
        },
        deleteContact: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("DELETE_CONTACT"),
                async ({deleteContact}, _, {dataSources, authUser}) => {
                    let usernamesArray = deleteContact.map((user) => {
                        return user.username
                    })

                    if (usernamesArray.includes(authUser.username)){
                        return true
                    }
                }
            )
        }
}

export default subscriptions;