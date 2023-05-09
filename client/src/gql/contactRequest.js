import { gql } from "@apollo/client";

const CONTACT_REQUEST = gql`
  subscription Subscription {
    addContactRequest {
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

export default CONTACT_REQUEST;