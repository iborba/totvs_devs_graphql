import express from 'express'
import graphqlHTTP from 'express-graphql'
import { Users } from './repository/users'
import { Posts } from './repository/posts'
const schema = require('./schema')
const user = new Users()
const posts = new Posts()

const app = express()

app.get('/', (_req, res) => {
  return res.status(200).send('Hello world')
})

app.get('/posts', async (_req, res) => {
  const result = await posts.getPosts()

  res.status(200).send(result)
})

app.get('/users', async (_req, res) => {
  const result = await user.getUsers()

  res.status(200).send(result)
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3000, _ => {
  console.log('🚀  Server ready at http://localhost:3000')
})
