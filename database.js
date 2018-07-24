const mongoose = require("mongoose")

class Database{
    constructor(url){
        mongoose.connect(url)
        this.toDoSchema = new mongoose.Schema({
            name: String,
            completed: Boolean
        })
        this.ToDo = mongoose.model("todo", this.toDoSchema)
    }
    
    addToDo(name){
        return this.ToDo.create({
            name: name,
            completed: false
        })
    }
    
    getAllToDos(){
        return this.ToDo.find({})
    }
    
    getToDo(id){
        return this.ToDo.findById(id)
    }
    
    toggleComplete(todoID){
        return this.ToDo.findById(todoID).
        then(function(todo){
            todo.completed = !todo.completed
            return todo.save()
        }).
        then(function(todo) {
            return todo;
        })
    }
    
    deleteToDo(ToDoID){
        this.ToDo.findByIdAndDelete(ToDoID)
    }
    
    deleteAllToDos()
    {
        this.ToDo.find({}).
        then(function(todos){
            this.deleteToDo(todos._id)
        })
    }
}

module.exports = Database