import { gql } from "@apollo/client";

const ADDED_MEMBER = gql`
     subscription AddedMember {
        addedMember {
            _id
            contacts
            email
            image
            chatContacts
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

export default ADDED_MEMBER;