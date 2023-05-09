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

type Query {
    profileUser(profileInput: ProfileInput): UserData
    existanceContact(existanceInput: ExistanceInput): User
    profileUserData(userDataInput: UserDataInput): UserData
    requestsContact(requestsInput: RequestsInput): UserData
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    addContact(addInput: [AddInput]): UserData
    acceptContact(acceptContactInput: [AcceptContactInput]): [UserData]
    deleteRequest(deleteReqInput: [DeleteReqInput]): UserData

}

type Subscription {
    addContactRequest: UserData
    acceptContactRequest: [UserData]
}
`
export default typeDefs;