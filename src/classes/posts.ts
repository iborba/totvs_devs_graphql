import fetch from 'node-fetch'

export class Posts {
  getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  getPost = (id: number) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json())
  getPostByUser = (userId: number) => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(res => res.json())
}
