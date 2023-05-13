const typeDefs = `#graphql 
type User {
    _id: ID!
    username: String
    email: String
    password: String
    token: String
}  

type Request {
    from: String!
    to: String!
  }

type UserData {
    _id: ID!
    username: String
    email: String
    contacts: [String]
    requests: [Request]
}

type Email{
    email: String
}

type Message {
    _id: ID
    content: String
    chatId: ID

  }
input MessageInput {
    content: String
    chatId: ID
}

input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
}

input LoginInput {
    email: String
    password: String
}

input ProfileInput {
    token: String
}
input ExistanceInput {
    email: String
}
input UserDataInput {
    email: String
}
input RequestsInput {
    email: String
}
input AddInput {
    email: String
}

input AcceptContactInput {
    username: String
}
input DeleteReqInput {
    username: String
}

input RoomInputMember {
    username: String
}

type Room {
    _id: String
    name: String
    members: [UserData]
  }

  input RoomInput {
    _id: String
    name: String
    members: [RoomInputMember]
  }

type Query {
    profileUser(profileInput: ProfileInput): UserData
    existanceContact(existanceInput: ExistanceInput): User
    profileUserData(userDataInput: UserDataInput): UserData
    requestsContact(requestsInput: RequestsInput): UserData

    #CHAT
    getMessages(getMessageInput: UserDataInput): Message
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    addContact(addInput: [AddInput]): UserData
    acceptContact(acceptContactInput: [AcceptContactInput]): [UserData]
    deleteRequest(deleteReqInput: [DeleteReqInput]): UserData

    #CHAT
    createMessage(createMessageInput: MessageInput): Message
    createChatRoom(createRoomInput: RoomInput): Room

}

type Subscription {
    addContactRequest: UserData
    acceptContactRequest: [UserData]
}
`
export default typeDefs;