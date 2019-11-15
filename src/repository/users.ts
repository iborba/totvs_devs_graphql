import fetch from 'node-fetch'
import * as dotenv from 'dotenv'

dotenv.config()

export class Users {
  getUsers = () => fetch(`${process.env.API_URL}users`).then(res => res.json())
  getUser = (id: number) => fetch(`${process.env.API_URL}users/${id}`).then(res => res.json())
}
