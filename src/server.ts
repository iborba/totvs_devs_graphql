import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyparser from 'body-parser'
import cors from 'cors'
import { Posts } from './repository/posts'
import { Users } from './repository/users'
const posts = new Posts()
const users = new Users()

const schema = require('./schema')

require('dotenv').config()

const app = express()
app.use(bodyparser.json())
app.use(cors({ origin: '*' }))

app.get('/', (_req, res) => {
  return res.status(200).send('Hello world')
})

app.get('/posts', async (_req, res) => {
  const result = await posts.getPosts()
  return res.status(200).send(result)
})

app.post('/posts', (req, res) => {
  const { title, description } = req.body

  posts.createPost(title, description)
  return res.status(200).send('Post criado com sucesso')
})

app.post('/authors', (req, res) => {
  const { name, address, email, phone } = req.body
  users.createUser(name, address, email, phone)
  return res.status(200).send('Usuário criado com sucesso')
})

app.get('/authors', async (_req, res) => {
  const result = await users.getUsers()
  return res.status(200).send(result)
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3000, _ => {
  console.log('🚀  Server ready at http://localhost:3000')
})
