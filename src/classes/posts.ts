import fetch from 'node-fetch'
import * as dotenv from 'dotenv'

dotenv.config()

export class Posts {
  getPosts = () => fetch(`${process.env.API_URL}posts`).then(res => res.json())
  getPost = (id: number) => fetch(`${process.env.API_URL}posts/${id}`).then(res => res.json())
  getPostByUser = (userId: number) => fetch(`${process.env.API_URL}posts?userId=${userId}`).then(res => res.json())
}
