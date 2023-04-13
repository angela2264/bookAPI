const express = require('express')
const cors = require('cors')

const logger = require("./logger");
const books = require('./books.json')
const { capitalise } = require('./helpers')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.send("Welcome the Books API")
})

app.get('/books', (req, res) => {
  res.send(fruits)
})

app.get('/books/:name', (req, res) => {
  const name = req.params.name.toLowerCase()

  const books = books.find(books => books.name.toLowerCase() === name)
  console.log(books)
  if (books === undefined) {
    res.status(404).send({ error: `books: ${name} not found :(`})
  }

  res.send(books)
})

app.post('/books', (req, res) => {
  const ids = books.map(fruit => books.id)
  let maxId = Math.max(...ids)
  const fruit = books.find(books => books.name === req.body.name)

  if (books !== undefined) {
    res.status(409).send({error: "The book already exists"})
  } else {
    maxId += 1
    const newBook = req.body
    newBook.id = maxId
    books.push(newBook)
    res.status(201).send(newBook)
  }
})

app.patch("/books/:name", (req, res) => {
  const books = books.find(books => books.name.toLowerCase() === req.params.name.toLowerCase());

  if (books === undefined) {
    return res.status(404).send({error: "books does not exist"})
  }

  try {
    const updatedBooks = { ...req.body, name: capitalise(req.body.name), id: fruit.id}
    const idx = books.findIndex(b => b.id === books.id);
    books[idx] = updatedBooks;
    res.send(updatedBooks)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.delete("/books/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const booksIndex = books.findIndex(books => fruit.name.toLowerCase() === name);

  if (booksIndex === -1) {
    res.status(404).send({ error: "The book does not exist" })
  } else {
    books.splice(booksIndex, 1);

    res.status(204).send()
  }
})


module.exports = app;
