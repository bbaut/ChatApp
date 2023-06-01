import { gql } from "@apollo/client";

const CREATED_GROUP = gql`
subscription Subscription {
    createdGroup {
      groups {
        chatId
        chatName
      }
    }
}
`

export default CREATED_GROUP;
