const next = require('next')
const express = require('express')

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()
const pgp = require('pg-promise')()

app.prepare().then(() => {
  const server = express()

  server.use(express.json())

  // db
  const connectionString = 'postgres://localhost:5432/question-game'
  const db = pgp(connectionString)

  // posts
  server.get('/api/posts', async (req, res) => {
    let posts = await db.any('select * from posts')
    res.send(posts)
  })

  server.post('/api/posts', async (req, res) => {
    let posts = await db.any('select * from posts')
    res.send(posts)
  })

  // questions
  server.get('/api/questions', async (req, res) => {

  })

  server.post('/api/questions', async (req, res) => {

  })

  // comments
  server.get('/api/comments', async (req, res) => {

  })

  server.post('/api/comments', async (req, res) => {

  })

  // upvotes
  server.get('/api/upvotes', async (req, res) => {

  })

  server.post('/api/upvotes', async (req, res) => {

  })

  // users

  server.post('/api/login', async (req, res) => {

  })

  server.post('/api/register', async (req, res) => {

  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT, err => {
    if (err) throw err
    console.log('hey this is your server, im running');
  })
})
