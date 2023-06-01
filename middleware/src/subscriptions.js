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

}

export default subscriptions;