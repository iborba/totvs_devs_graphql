import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import fetch from 'node-fetch'
const typeDefs = require('./schema')
const port = 3000

const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
const getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
const getUser = (id) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(async res => res.json())
const getPost = (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json())
const getPostByUser = (userId) => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(res => res.json())

const definition = {
  typeDefs,
  resolvers: {
    Query: {
      users: () => getUsers(),
      posts: (_, __) => getPosts(),
      user: (_, args) => getUser(args.id),
      post: (_, args) => getPost(args.id)
    },
    Post: {
      userId: parent => getUser(parent.userId)
    },
    User: {
      posts: parent => getPostByUser(parent.id)
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
