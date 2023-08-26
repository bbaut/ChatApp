import { gql } from "@apollo/client";

const REMOVED_MEMBER = gql`
     subscription Subscription {
        removedMember {
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

export default REMOVED_MEMBER;