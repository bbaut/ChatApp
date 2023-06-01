export const typeDef = `#graphql 

type Content {
    text: String
    sender: String
    sendedBy: String
}

type Room {
    _id: String
    member: String
}

type Group {
    _id: String
    members: [String]
    groupName: String
}

type Message {
    message: Content
    sender: String
    chatId: String

}

type UserData {
    _id: ID!
    username: String
    email: String
    contacts: [String]
    requests: [Request]
    groups: [Groupdata]
}

type Request {
    from: String!
    to: String!
}

type Groupdata {
    chatId: String!
    chatName: String!
}

input GetMessageInput {
    chatId: String
    from: String
}

input getRoomInput {
    id: String
  }

input getGroupInput {
    id: String
}

input MessageInput {
    message: inputContent
    sender: String
    chatId: String
}

input inputContent {
    text: String
}

input RoomInput {
    createdBy: String
    member: String
}

input GroupInput {
    createdBy: String
    groupName: String
}

input AddMemberInput {
    username: String
    id: ID
    member: String
    chatName: String
}

type Query {
    getMessages(getMessageInput: GetMessageInput): [Content]
    getRoom(getRoomInput: getRoomInput): Room
    getGroup(getGroupInput: getGroupInput): Group
}

type Mutation {
    createMessage(createMessageInput: MessageInput): Message
    createChatRoom(createRoomInput: RoomInput): Room
    createGroupRoom(createGroupInput: GroupInput): Group!
    addMemberGroup(addMemberInput: AddMemberInput): UserData
}

`

// export default typeDef;