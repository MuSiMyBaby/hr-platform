import { gql } from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    id: Int!
    email: String!
    phoneNumber: String!
    firstName: String!
    lastName: String!
    nickname: String
    address: String
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
  }

  input LineLoginInput {
    lineId: String!
  }

  input GoogleLoginInput {
    googleId: String!
  }

  input FacebookLoginInput {
    facebookId: String!
  }

  input EmailLoginInput {
    email: String!
    password: String!
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
    googleLogin(input: GoogleLoginInput!): User
    facebookLogin(input: FacebookLoginInput!): User
    emailLogin(input: EmailLoginInput!): User
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
  }
`;

export default userTypeDefs;
