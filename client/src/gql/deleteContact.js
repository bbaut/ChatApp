import { gql } from "@apollo/client";

const DELETE_CONTACT = gql` 
    subscription Subscription {
        deleteContact {
        _id
        contacts
        email
        groups {
            chatId
            chatName
        }
        image
        requests {
            from
            to
        }
        username
        }
  }
`

export default DELETE_CONTACT;