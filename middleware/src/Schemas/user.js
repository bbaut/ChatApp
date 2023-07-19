export const typeDef = `#graphql 
type User {
    _id: ID!
    username: String
    email: String
    password: String
    token: String
    image: String
} 

type UserData {
    _id: ID!
    username: String
    email: String
    contacts: [String]
    requests: [Request]
    groups: [Groupdata]
    image: String
}

type Request {
    from: String!
    to: String!
}

type Groupdata {
    chatId: String!
    chatName: String!
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

input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
    image: String
}

input LoginInput {
    email: String
    password: String
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

input ContactDataInput {
    usernameArray: [String]
}

input DeleteContactInput {
    username: String
}

type Query {
    profileUser(profileInput: ProfileInput): UserData
    existanceContact(existanceInput: ExistanceInput): User
    profileUserData(userDataInput: UserDataInput): UserData
    requestsContact(requestsInput: RequestsInput): UserData
    contactData(contactDataInput: ContactDataInput): [UserData]
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    addContact(addInput: [AddInput]): UserData
    acceptContact(acceptContactInput: [AcceptContactInput]): [UserData]
    deleteRequest(deleteReqInput: [DeleteReqInput]): UserData
    deleteContact(deleteContactInput: [DeleteContactInput]): [UserData]
}
`

// export default typeDef;