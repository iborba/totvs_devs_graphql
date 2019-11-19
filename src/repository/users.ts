import * as dotenv from 'dotenv'
import { Collection } from 'mongodb'

dotenv.config()

export class Users {
  static collectionName: string = 'users'
  constructor (private readonly collection: Collection) { }

  getUsers = () => this.collection.find({}).toArray()
  getUser = (id) => this.collection.find({ _id: id }).toArray()
  createUser = (name, address, email, phone) => this.collection.insertOne({ name, address, email, phone })
}
