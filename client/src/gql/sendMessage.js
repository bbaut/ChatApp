import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
    subscription Subscription {
        sendMessage {
            chatId
            message {
                text
                isScribble
            }
            sender
        }
    }
`;

export default SEND_MESSAGE;