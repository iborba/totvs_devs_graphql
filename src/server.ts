import mongodb from 'mongodb'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyparser from 'body-parser'
import cors from 'cors'
const schema = require('./schema')
require('dotenv').config()

mongodb.MongoClient.connect(`${process.env.MONGODB_URL}:${process.env.PORT}`, { useUnifiedTopology: true }, (_err, client) => {
  const app = express()
  app.use(bodyparser.json())
  app.use(cors({ origin: '*' }))

  const db = client.db('totvs_devs')
  const postsCollection = db.collection('posts')
  const usersCollection = db.collection('users')

  app.get('/', (_req, res) => {
    return res.status(200).send('Hello world')
  })

  app.post('/posts', (req, res) => {
    const { title, description } = req.body

    const result = postsCollection.insertOne({ title, description })
    return res.status(200).send(result)
  })

  app.post('/authors', (req, res) => {
    const { name, address, email, phone } = req.body
    const result = usersCollection.insertOne({ name, address, email, phone })
    return res.status(200).send(result)
  })

  app.get('/authors', async (_req, res) => {
    const result = await usersCollection.find({}).toArray()
    return res.status(200).send(result)
  })

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))

  app.listen(3000, _ => {
    console.log('🚀  Server ready at http://localhost:3000')
  })
})
