import { gql } from "@apollo/client";

const ACCEPT_CONTACT_REQUEST = gql`
    subscription Subscription {
        acceptContactRequest {
            _id
            contacts
            image
            email
            groups {
            chatId
            chatName
            }
            requests {
                from
                to
            }
            username
        }
    }
`;

export default ACCEPT_CONTACT_REQUEST;