const typeDefs = `#graphql 
type User {
    _id: ID!
    username: String
    email: String
    password: String
    token: String
}

type UserUsers {
    _id: ID!
    username: String
    email: String
    contacts: [String]
    requests: [String]
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
input RequestsInput {
    email: String
}
input AddInput {
    email: String
}

type Query {
    profileUser(profileInput: ProfileInput): User
    existanceContact(existanceInput: ExistanceInput): User
    requestsContact(requestsInput: RequestsInput): UserUsers
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    addContact(addInput: [AddInput]): User
}
`
export default typeDefs;