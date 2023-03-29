import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            email
            username
            _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
      user {
        username
        email
        password
        _id
      }
    }
  }
  `;

export const SAVE_NEWS = gql`
  mutation saveNews($username: String!, $description: String, $newsId: String!, $image: String, $link: String, $title: String!, $authors:[String]) {
    saveBook(username: $username, description: $description, newsId: $newsId, image: $image, link: $link, title: $title, authors:$authors) {
        savedNews {
            authors
            description
            newsId
            image
            link
            title
          }
    }
  }
  `;

  export const DELETE_NEWS = gql`
  mutation deleteNews($username: String!, $newsId: String!) {
    deleteBook(username: $username, newsId: $newsId) {
        savedNews {
            authors
            description
            newsId
            image
            link
            title
          }
        
    }
  }
`;