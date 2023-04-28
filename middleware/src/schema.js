const typeDefs = `#graphql 
type User {
    _id: ID!
    username: String
    email: String
    password: String
    token: String
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

type Query {
    profileUser(profileInput: ProfileInput): User
    existanceContact(existanceInput: ExistanceInput): User 
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
}
`
export default typeDefs;