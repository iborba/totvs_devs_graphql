import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const port = 3000

const definition = {
  typeDefs,
  resolvers
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
