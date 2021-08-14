const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000  

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin-tushar:test123@cluster0.p6aee.mongodb.net/todoDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const User = mongoose.model('ToDoUser', userSchema)

const todoSchema = mongoose.Schema({
    authorID: String,
    todo: String,
    completed: Boolean,
    starred: Boolean
})
const Todo = mongoose.model('Todo', todoSchema)

app.post('/api/signup', (req, res)=>{

    newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    User.findOne({username: req.body.username, email: req.body.email, password: req.body.password
    }, (err, result)=>{
        if(!err){
            if(result){
                res.json({status: 'exists'})
            }else{
                try{
                    newUser.save()
                    res.json({status: 'true'})
                }catch{
                    res.json({status: 'error'})
                }
            }
        }
    })
})

app.post('/api/login', (req, res)=>{

    User.findOne({email: req.body.email, password: req.body.password}, (err, result)=>{
        if(!err){
            if(result){
                res.json({...result, status: 'logged in'})
            }else{
                res.json({status: 'no account'})
            }
        }
    })
})

app.get('/api/todos/:id', (req, res)=>{

    Todo.find({authorID: req.params.id}, (err, result)=>{
        if(!err){
            if(result){
                res.json({result})
            }
        }
    })

})

app.post('/api/star/', (req, res)=>{

    Todo.findOne({authorID: req.body.authorID, todo: req.body.todo, completed: req.body.completed, starred: req.body.starred}, (err, result)=>{
        if(!err){
            if(result){
                Todo.updateOne({authorID: req.body.authorID, todo: req.body.todo, starred: req.body.starred, completed: req.body.completed}, {starred: true}, (err)=>{
                    if(!err){
                        res.json({status: 'updated'})
                    }else{
                        res.json({status: 'error'})
                    }
                })
            }
        }else{
            res.json({status: 'not found'})
        }
    })
})

app.post('/api/unstar', (req, res)=>{

    Todo.findOne({authorID: req.body.authorID, todo: req.body.todo, completed: req.body.completed, starred: req.body.starred}, (err, result)=>{
        if(!err){
            if(result){
                Todo.updateOne({authorID: req.body.authorID, todo: req.body.todo, starred: req.body.starred, completed: req.body.completed}, {starred: false}, (err)=>{
                    if(!err){
                        res.json({status: 'updated'})
                    }else{
                        res.json({status: 'error'})
                    }
                })
            }
        }else{
            res.json({status: 'not found'})
        }
    })
})

app.post('/api/complete', (req, res)=>{
    Todo.findByIdAndUpdate(req.body._id, {completed: true}, (err)=>{
        if(!err){
            res.json({status: 'completed'})
        }
    })
})

app.post('/api/incomplete', (req, res)=>{
    Todo.findByIdAndUpdate(req.body._id, {completed: false}, (err)=>{
        if(!err){
            res.json({status: 'incomplete'})
        }
    })
})

app.post('/api/delete', (req, res)=>{
    Todo.findByIdAndDelete(req.body._id, err => res.json({status: 'deleted'}))
})

app.post('/api/addtodo', (req, res)=>{
    const newTodo = new Todo({
        authorID: req.body.authorID,
        todo: req.body.todo,
        starred: false,
        completed: false
    })
    newTodo.save()
})

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static("client/build"))
// }

app.listen(PORT)
