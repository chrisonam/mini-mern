const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./model/Todo'); //import the schema from model


const app = express();

// expressjson for json format 
app.use(express.json());
// Bypasses some error from react app
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
   .then(()=> console.log("Connected to DB"))
   .catch(console.error);

   // read todo list

   app.get('/todos', async (req,res)=>{
         const todos = await Todo.find();
         res.json(todos);
   });

  // add  one todo 
   app.post('/todos/new', (req,res) =>{

    const todo = new Todo({
        text: req.body.text
    });
     todo.save();
     res.json(todo);

   });

   // delete one todo 

   app.delete('/todos/delete/:id', async (req,res)=> {
      const result = await Todo.findByIdAndDelete(req.params.id);

      res.json(result);
      
   })

   // find one todo

   app.put('/todos/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = ! todo.complete;
    todo.save();
    res.json(todo);

   })











   app.listen(3001,()=>console.log("Server Listening on 3001"));