import { Users } from './classes/users'
import { Posts } from './classes/posts'

const user = new Users()
const posts = new Posts()

const resolvers = {
  Query: {
    users: () => user.getUsers(),
    posts: (_, __) => posts.getPosts(),
    user: (_, args) => user.getUser(args.id),
    post: (_, args) => posts.getPost(args.id)
  },
  Post: {
    userId: parent => user.getUser(parent.userId)
  },
  User: {
    posts: parent => posts.getPostByUser(parent.id)
  },
  Mutation: {
    createPost: (title, body) => {
      return 'OK'
    }
  }
}

export default resolvers
