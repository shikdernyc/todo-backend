require("dotenv").config()
const express = require("express")
const router = express.Router()
const Database = require("./database.js")

const db = new Database(process.env.DB_URL)

router.post('/api/todos/create', (req, res)=>{
    let {name} = req.body
    db.addToDo(name)
    .then((todo)=>{
        res.json(todo)
    })
})

router.post('/api/todos/:id/toggle', (req, res)=>{
    db.toggleComplete(req.params.id)
    .then((todo)=>{
        res.json(todo)
    })
})

router.get('/api/todos/:id', (req, res)=>{
    db.getToDo(req.params.id)
    .then((todo)=>{
        res.json(todo)
    })
})

router.get('/api/todos', (req, res)=>{
    db.getAllToDos().
    then((todos)=>{
        res.json(todos)
    })
})

module.exports = router