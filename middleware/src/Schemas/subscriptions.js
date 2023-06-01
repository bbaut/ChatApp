export const typeDef = `#graphql 

type Subscription {
    addContactRequest: UserData
    acceptContactRequest: [UserData]
    sendMessage: Message
}

type UserData {
    _id: ID!
    username: String
    email: String
    contacts: [String]
    requests: [Request]
    groups: [Groupdata]
}

type Message {
    message: Content
    sender: String
    chatId: String
}

`

// export default typeDef;