import express from 'express'
import graphqlHTTP from 'express-graphql'
const app = express()
import DataLoader from 'dataloader'
import util from 'util'
const schema = require('./schema')
const parseXML = util.promisify(require('xml2js').parseString)()


const fetchAuthor = id => {
  fetch(`https://www.goodreads.com/author/show.xml?id=${id}&key=Rz607gLuIzr1a55wEbl3w `)
    .then(response => {
      console.log('dmkasjdsk')
      response.text()
    })
    .then(parseXML)
}

const fetchBook = id => {
  fetch(`https://www.goodreads.com/book/show/${id}.xml?key=Rz607gLuIzr1a55wEbl3w `)
    .then(response => response.text())
    .then(parseXML)
}

app.use('/graphql', graphqlHTTP(req => {
  const loadAuthor = new DataLoader(k => Promise.all(k.map(fetchAuthor)))
  const loadBook = new DataLoader(k => Promise.all(k.map(fetchBook)))

  return {
    schema,
    context: {
      loadAuthor,
      loadBook
    },
    graphiql: true
  }
}))

app.listen(3333, (_ => { console.log("Listening at 3333") }))