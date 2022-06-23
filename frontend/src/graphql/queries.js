import { gql } from "@apollo/client";

//-- Get all user quotes --//
const GET_ALL_USERS_QUOTES = gql`
query getQuotes {
  userQuotes {
    name
    by{
      firstName
    }
  }
}
`;

const GET_MY_PROFILE = gql`
 query getMyProfile{
  user:myprofile{
     firstName
     lastName
     email
     myQuotes{
       name
     }
   }
 }  
`

export {GET_ALL_USERS_QUOTES, GET_MY_PROFILE}