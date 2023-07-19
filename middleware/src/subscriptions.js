import { withFilter } from "graphql-subscriptions";
import pubsub from "./pubsub.js";

const subscriptions = {
        addContactRequest: {
            subscribe:
                () => pubsub.asyncIterator("CONTACT_REQUEST")
        },
        acceptContactRequest: {
            subscribe:
                () => pubsub.asyncIterator("ACCEPT_CONTACT_REQUEST")
        },
        sendMessage: {
            subscribe:
                () => pubsub.asyncIterator("SEND_MESSAGE")
        },
        createdGroup: {
            subscribe:
                () => pubsub.asyncIterator("CREATED_GROUP")
        },
        addedMember: {
            subscribe:
                () => pubsub.asyncIterator("ADDED_MEMBER")
        },
        removedMember: {
            subscribe:
                () => pubsub.asyncIterator("REMOVED_MEMBER")
        },
        deleteContact: {
            subscribe:
                () => pubsub.asyncIterator("DELETE_CONTACT")
        }

}

export default subscriptions;