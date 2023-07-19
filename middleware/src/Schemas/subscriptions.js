export const typeDef = `#graphql 

type Subscription {
    addContactRequest: UserData
    acceptContactRequest: [UserData]
    sendMessage: Message
    createdGroup: UserData
    addedMember: UserData
    removedMember: UserData
    deleteContact: [UserData]
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

type Content {
    text: String
    sender: String
    sendedBy: String
    isScribble: Boolean
}

type Groupdata {
    chatId: String!
    chatName: String!
}
`

// export default typeDef;