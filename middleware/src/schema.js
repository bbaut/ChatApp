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

# type Member {
#     _id: String
#     username: String
# }

type Group {
    chatId: String!
    chatName: String!
}

type UserData {
    _id: ID!
    username: String
    email: String
    contacts: [String]
    requests: [Request]
    groups: [Group]
}

type Email{
    email: String
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
    member: String
    groupName: String
  }

  input RoomInput {
    createdBy: String
    member: String
    groupName: String
  }

  input getRoomInput {
    id: String
  }

type Content {
    text: String
    sender: String
}

type Message {
    message: Content
    sender: String
    chatId: String

}
input MessageInput {
    message: inputContent
    sender: String
    chatId: String
}

input inputContent {
    text: String
}

input GetMessageInput {
    chatId: String
    from: String
}

input IdInput {
    ids: [ID]
}

type Usernames {
    usernames: [String]
}

type Query {
    profileUser(profileInput: ProfileInput): UserData
    existanceContact(existanceInput: ExistanceInput): User
    profileUserData(userDataInput: UserDataInput): UserData
    idToUsrnm(idInput: IdInput): Usernames
    requestsContact(requestsInput: RequestsInput): UserData

    #CHAT
    getMessages(getMessageInput: GetMessageInput): [Content]
    getRoom(getRoomInput: getRoomInput): Room
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
    sendMessage: Message
}
`
export default typeDefs;