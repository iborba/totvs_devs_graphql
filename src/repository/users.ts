import * as dotenv from 'dotenv'
import mongodb from 'mongodb'

dotenv.config()

export class Users {
  userCollection: any

  constructor () {
    mongodb.MongoClient.connect(`${process.env.MONGODB_URL}:${process.env.PORT}`, { useUnifiedTopology: true }, (_err, client) => {
      this.userCollection = client.db('totvs_devs').collection('users')
    })
  }

  getUsers = () => this.userCollection.find({}).toArray()
  getUser = (id) => this.userCollection.find({ _id: id }).toArray()
  createUser = (name, address, email, phone) => this.userCollection.insertOne({ name, address, email, phone })
}
