import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'

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

server.listen(3000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
