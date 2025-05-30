import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: Int!
    identityNumber: String
    workPermit: String
    passport: String
    email: String!
    phoneNumber: String!
    profilePicture: String
    firstName: String!
    lastName: String!
    englishName: String
    nickname: String
    address: String
    skipRegistration: Boolean
    googleLogin: Boolean
    facebookLogin: Boolean
    lineLogin: Boolean
    lineId: String
    facebookId: String
    googleId: String
    lastLogin: String
    lastLoginIp: String
    createdAt: String
    updatedAt: String
    token: String
  }

  input LineLoginInput {
    lineId: String!
  }

  input EmailLoginInput {
    email: String!
    password: String!
  }

  input GoogleLoginInput {
    googleId: String!
  }

  input FacebookLoginInput {
    facebookId: String!
  }

  input CreateUserInput {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  phoneNumber: String!
}

input UpdateUserInput {
  firstName: String
  lastName: String
  phoneNumber: String
  nickname: String
  address: String
}

  type Query {
    me: User
    userExists(email: String, phone: String): Boolean
  }

  type Mutation {
    lineLogin(input: LineLoginInput!): User
    emailLogin(input: EmailLoginInput!): User
    googleLogin(input: GoogleLoginInput!): User
    facebookLogin(input: FacebookLoginInput!): User
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
  }
`;

export default typeDefs;
