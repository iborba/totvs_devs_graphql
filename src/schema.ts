import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } from 'graphql'
import { Users } from './repository/users'
import { Posts } from './repository/posts'
const user = new Users()
const posts = new Posts()

const userType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID! },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString }
  }
})

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLID! },
    title: { type: GraphQLString! },
    body: { type: GraphQLString },
    author: {
      type: userType,
      resolve: (source, _params) => {
        return user.getUser(source.userId)
      }
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_source, { id }) => {
        return posts.getPost(id)
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts.getPosts()
      }
    },
    author: {
      type: userType,
      args: {
        id: { type: GraphQLID! }
      },
      resolve: (_source, { id }) => {
        return user.getUser(id)
      }
    },
    authors: {
      type: new GraphQLList(userType),
      resolve: () => {
        return user.getUsers()
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema
