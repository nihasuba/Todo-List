const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Model/Todos')

const app  = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Todo', {
    useNewUrlParser: true, //use the new MongoDB connection string parser
    useUnifiedTopology : true  //use the new MongoDB driver's unified topology engine.
})


app.post('/add',async(req, res) => {
    try{
        console.log("Received data :", req.body)
        const task = new TodoModel(req.body)
        await task.save();
        res.status(201).json(task)
    }catch(err){
        res.status(400).json({error:err.message})
    }
   
})

app.get('/list',async(req, res) =>{
    try{
        const result = await TodoModel.find();
        res.status(201).json(result)
    } catch(err) {
        res.status(400).json({error:err.message})
    }
    
})

app.put('/update/:id',async(req, res) =>{
    try {
        const {id} = req.params;
        console.log(id)
        await TodoModel.findByIdAndUpdate(id, {done:true})
        res.status(201).json({success:true})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
   
    

})

app.delete('/delete/:id',async(req, res) =>{
    try {
        const {id} = req.params;
        console.log(id)
        await TodoModel.findByIdAndDelete(id)
        res.status(201).json({success:true})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
    
    
    
})

app.listen(5000, () => {
    console.log("server is Running")
})