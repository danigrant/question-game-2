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
    const { user_id, url, type } = req.body

    let post = await db.one("insert into posts(url, user_id, type) values($1, $2, $3) returning post_id;", [url, user_id, type])
    res.send(post)
  })

  // questions
  server.get('/api/posts/:post_id/questions', async (req, res) => {
    const { post_id } = req.params

    let questions = await db.any('select * from questions where post_id = $1;', [post_id])
    res.send(questions)
  })

  server.post('/api/posts/:post_id/questions', async (req, res) => {
    const { post_id } = req.params
    const { user_id, question } = req.body

    let q = await db.one("insert into questions(post_id, user_id, question) values($1, $2, $3) returning question_id;", [post_id, user_id, question])
    res.send(q)
  })

  // comments
  server.get('/api/posts/:post_id/questions/:question_id/comments', async (req, res) => {
    const { question_id } = req.params

    let comments = await db.any('select * from comments where question_id = $1 order by upvote_count desc;', [question_id])
    res.send(comments)
  })

  server.post('/api/posts/:post_id/questions/:question_id/comments', async (req, res) => {
    const { question_id } = req.params
    const { user_id, comment } = req.body

    let c = await db.one("insert into comments(question_id, user_id, comment) values($1, $2, $3) returning comment_id;", [question_id, user_id, comment])
    res.send(c)
  })

  // question upvotes
  server.get('/api/posts/:post_id/questions/:question_id/upvotes', async (req, res) => {
    const { question_id } = req.params

    let upvotes = await db.any('select * from upvotes where question_id = $1;', [question_id])
    res.send(upvotes)
  })

  server.post('/api/posts/:post_id/questions/:question_id/upvotes', async (req, res) => {
    const { question_id } = req.params
    const { user_id } = req.body

    let upvote = db.one("insert into upvotes(question_id, user_id, type) values($1, $2, $3) returning upvote_id;", [question_id, user_id, "question"])
    res.send(upvote)
  })

  // comment upvotes
  server.get('/api/posts/:post_id/questions/:question_id/comments/:comment_id/upvotes', async (req, res) => {
    const { comment_id } = req.params

    let upvotes = await db.any('select * from upvotes where comment_id = $1;', [comment_id])
    res.send(upvotes)
  })

  server.post('/api/posts/:post_id/questions/:question_id/upvotes', async (req, res) => {
    const { question_id } = req.params
    const { user_id } = req.body

    let upvote = db.one("insert into upvotes(comment_id, question_id, user_id, type) values($1, $2, $3) returning upvote_id;", [comment_id, question_id, user_id, "comment"])
    res.send(upvote)
  })

  // users

  server.post('/api/login', async (req, res) => {
    res.send("welcome back")
  })

  server.post('/api/register', async (req, res) => {
    res.send("welcome")
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT, err => {
    if (err) throw err
    console.log('hey this is your server, im running');
  })
})
