import { gql } from "apollo-server";

const typeDefs = gql`
# //---------- Query ----------//
  type Query {
    allUsers: [User]
    singleUser(_id: ID!): User
    userQuotes: [QuoteWithName]
    singleUserQuote(by: ID!): [QuoteWithName]
    myprofile:User
  }
  type User {
    _id: ID! # ! use for manedatory feild
    firstName: String
    lastName: String
    email: String
    password: String
    myQuotes: [Quote]
  }
  type Quote {
    by: String
    name: String
  }
  type QuoteWithName {
    by: IdName
    name: String
  }

  type IdName {
    _id: String
    firstName: String
  }

  type Token {
    token: String!
  }


# //---------- Mutation ----------//

  # SignUp anSignIn query
  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createQuote(name: String!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
