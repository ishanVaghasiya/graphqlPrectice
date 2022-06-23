import { gql } from "@apollo/client";

//user is alias for signupUser
const USER_SIGNUP = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;

const USER_LOGIN = gql`
  mutation SigninUser($userSignin: UserSigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

const WRITE_QUOTES = gql`
  mutation weriteQuotes($name: String!) {
    quote: createQuote(name: $name) 
  }
`;

export { USER_SIGNUP, USER_LOGIN, WRITE_QUOTES };
