import { Collection, ObjectId } from "mongodb"

export class Posts {
  static collectionName: string = 'posts'

  constructor(private readonly collection: Collection) { }

  getPosts = () => this.collection.find({}).toArray()
  getPost = (id: ObjectId) => this.collection.find({ _id: id }).toArray()
  createPost = (title, description) => this.collection.insertOne({ title, description })
}