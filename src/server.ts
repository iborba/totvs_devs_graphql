import { ApolloServer, gql } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'

const port = 3000

const definition = {
  typeDefs: gql`
      type Query {
        _empty: String
      }
      
      type Mutation { 
        _empty: String
      }

      type Subscription { 
        _empty: String
      }
  `,
  resolvers: {}
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
