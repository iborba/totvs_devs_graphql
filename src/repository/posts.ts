import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
// import * as low from 'lowdb'
// import * as FileSync from 'lowdb/adapters/FileSync'
dotenv.config()

export class Posts {
  getPosts = () => fetch(`${process.env.API_URL}posts`).then(res => res.json())

  getPost = (id: number) => fetch(`${process.env.API_URL}posts/${id}`).then(res => res.json())

  getPostByUser = (userId: number) => fetch(`${process.env.API_URL}posts?userId=${userId}`).then(res => res.json())

  createPost = (title: string, body: string, userId: number) => fetch(`${process.env.API_URL}posts`, {
    method: 'POST',
    body: JSON.stringify({ title, body, userId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  }).then(res => res.json())

  updatePost = (id: number, title: string, body: string, userId: number) => fetch(`${process.env.API_URL}posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, body }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  }).then(_ => 'Registro excluído')

  deletePost = (id: number) => fetch(`${process.env.API_URL}posts/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
}
