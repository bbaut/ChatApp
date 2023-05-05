import { gql } from "@apollo/client";

const CONTACT_REQUEST = gql`
  subscription Subscription {
    addContactRequest {
      email
    }
  }
`;

export default CONTACT_REQUEST;