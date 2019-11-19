import * as dotenv from 'dotenv'
import mongodb from 'mongodb'

dotenv.config()

export class Posts {
  postCollection: any

  constructor() {
    mongodb.MongoClient.connect(`${process.env.MONGODB_URL}:${process.env.PORT}`, { useUnifiedTopology: true }, (_err, client) => {
      this.postCollection = client.db('totvs_devs').collection('posts')
    })
  }

  getPosts = () => this.postCollection.find({}).toArray()
  getPost = (id) => this.postCollection.find({ _id: id }).toArray()

  createPost = (title, description) => this.postCollection.insertOne({ title, description })
}
