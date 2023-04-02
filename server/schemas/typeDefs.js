const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type News {
    _id: ID
    title: String!
    author: String
    body: String!
    date: String!
    source: Sources
    subscription: String!
  }

  type Sources {
    _id: ID
    title: String!
    http: String!
  }

  type Query {
    user(username: String!): User
    getNews(subscription: String!): [News]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
