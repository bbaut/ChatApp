import { gql } from "@apollo/client";

const ADDED_MEMBER = gql`
     subscription AddedMember {
        addedMember {
            _id
            contacts
            email
            image
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