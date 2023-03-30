import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(email: $email) {
        _id
        username
        email
        password
      }
    }
`;
