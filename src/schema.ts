import { gql } from 'apollo-server'

module.exports = gql`
    type Query {
      users: [User!]!
      posts: [Post!]!
      user(id: ID): User
      post(id: ID): Post
    }
    
    type User {
      id: ID!
      name: String
      email: String
      username: String
      phone: String
      website: String
      posts: [Post]
    }

    type Post {
      id: ID!
      title: String!
      body: String
      userId: User
    }
  `
