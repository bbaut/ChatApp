import { withFilter } from "graphql-subscriptions";
import pubsub from "./pubsub.js";

const subscriptions = {
    // addContactRequest: {
    //     subscribe: withFilter(
    //         () => pubsub.asyncIterator(["CONTACT_REQUEST"]),
    //         ({addContact}, _) => {
    //             console.log("hey")
    //             const {to} = addContact
    //             const exists = to.username;
    //             return exists
    //         }
    //     )
    // }
        addContactRequest: {
            subscribe:
                () => pubsub.asyncIterator("CONTACT_REQUEST")
        },
        acceptContactRequest: {
            subscribe:
                () => pubsub.asyncIterator("ACCEPT_CONTACT_REQUEST")
        } 
}

export default subscriptions;