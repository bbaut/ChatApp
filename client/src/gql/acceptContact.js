import { gql } from "@apollo/client";

const ACCEPT_CONTACT_REQUEST = gql`
    subscription Subscription {
        acceptContactRequest {
            _id
            contacts
            email
            requests {
                from
                to
            }
            username
        }
    }
`;

export default ACCEPT_CONTACT_REQUEST;