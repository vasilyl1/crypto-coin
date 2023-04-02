import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        password
      }
    }
`;

export const QUERY_NEWS = gql`
  query GetNews($subscription: String!) {
    getNews(subscription: $subscription) {
        _id
        textContent
        date
        subscription
        source {
          _id
          title
          http
        }
      }
    }
`;

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        email
        password
      }
    }
`;