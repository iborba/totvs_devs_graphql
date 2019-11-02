import { ApolloServer, gql } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import fetch from 'node-fetch'

const port = 3000

const definition = {
  typeDefs: gql`
    type Query {
      _empty: String
      users: [User!]!
      user(id: ID): User
    }
    
    type User {
      id: ID!
      name: String
      email: String
      username: String
      phone: String
      website: String
    }
  `,
  resolvers: {
    Query: {
      users: () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
      user: (_, args) => {
        const { id } = args
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.json())
      }
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
