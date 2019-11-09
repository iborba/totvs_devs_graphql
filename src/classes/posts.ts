import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
// import * as low from 'lowdb'
// import * as FileSync from 'lowdb/adapters/FileSync'
dotenv.config()

export class Posts {
  getPosts = () => fetch(`${process.env.API_URL}posts`).then(res => res.json())
  getPost = (id: number) => fetch(`${process.env.API_URL}posts/${id}`).then(res => res.json())
  getPostByUser = (userId: number) => fetch(`${process.env.API_URL}posts?userId=${userId}`).then(res => res.json())
}

// export class PostsDB {
//   constructor () {
//     const adapter = new FileSync('db.json')
//     const db = low(adapter)

//     db.defaults({ getPosts: [], post: {}, postByYUser: {} }).write()

//     db.get('posts').push({ id: 1, title: 'Primeiro titulo', body: 'Primeiro conteúdo da mensagem' }).write()
//   }
// }
