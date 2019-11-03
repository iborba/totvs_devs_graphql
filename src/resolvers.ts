import fetch from 'node-fetch'

const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
const getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
const getUser = (id: number) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(async res => res.json())
const getPost = (id: number) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json())
const getPostByUser = (userId: number) => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(res => res.json())

const resolvers = {
  Query: {
    users: () => getUsers(),
    posts: (_, __) => getPosts(),
    user: (_, args) => getUser(args.id),
    post: (_, args) => getPost(args.id)
  },
  Post: {
    userId: parent => getUser(parent.userId)
  },
  User: {
    posts: parent => getPostByUser(parent.id)
  }
}

export default resolvers
