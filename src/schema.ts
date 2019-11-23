import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } from "graphql"
import { Posts } from './repository/posts'
import { MongoClient } from 'mongodb'

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLString! },
    title: { type: GraphQLString! },
    body: { type: GraphQLString }
  }
})
const getConn = (async () => {
  const connection = await MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true })

  const db = connection.db('totvs_devs')
  return new Posts(db.collection(Posts.collectionName))
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_source, { id }) => {
        const posts = await getConn()
        return posts.getPost(id)
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async () => {
        const posts = await getConn()
        
        return posts.getPosts()
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema