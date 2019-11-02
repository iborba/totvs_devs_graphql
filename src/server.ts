import { ApolloServer, gql } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import fetch from 'node-fetch'

const port = 3000

const definition = {
  typeDefs: gql`
    type Query {
      users: [User!]!
      user(id: ID): User
      posts: [Post!]!
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
    }
  `,
  resolvers: {
    Query: {
      users: () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
      user: (_, args) => fetch(`https://jsonplaceholder.typicode.com/users/${args.id}`).then(res => res.json()),
      posts: (_, __) => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
    }
  }
}

const schema = makeExecutableSchema(definition)

const serverConfig = {
  schema,
  playGround: {
    settings: {
      'editor.theme': 'dark',
      'editor.cursorShape': 'line'
    }
  }
}

const server = new ApolloServer(serverConfig)

server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
