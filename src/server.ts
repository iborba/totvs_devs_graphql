import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyparser from 'body-parser'
import cors from 'cors'
import { Posts } from './repository/posts'
import { MongoClient } from 'mongodb'

(async function () {
  require('dotenv').config()

  const connection = await MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true })

  const db = connection.db('totvs_devs')
  const posts = new Posts(db.collection(Posts.collectionName))
  const schema = require('./schema')

  const app = express()
  app.use(bodyparser.json())
  app.use(cors({ origin: '*' }))

  app.get('/', ({ res }) => {
    return res.status(200).send('🚀  Hello world Grapqhl')
  })

  app.get('/posts', async ({ res }) => {
    const result = await posts.getPosts()
    return res.status(200).send(result)
  })

  app.post('/posts', (req, res) => {
    const { title, description } = req.body

    posts.createPost(title, description)
    return res.status(200).send('Post criado com sucesso')
  })

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))

  app.listen(process.env.PORT, _ => {
    console.log(`🚀  Server ready at http://localhost:${process.env.PORT}`)
  })
})()
