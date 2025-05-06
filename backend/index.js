const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Model/Todos')
const UserModel = require('./Model/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const JWT_SECRET = process.env.JWT_SECRET;

const app  = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Todo', {
    useNewUrlParser: true, //use the new MongoDB connection string parser
    useUnifiedTopology : true  //use the new MongoDB driver's unified topology engine.
})


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        const user = await UserModel.findOne({ email });
        console.log(user);
        console.log(user.password);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // if (password !== user.password) {
        //     return res.status(400).json({ message: "Invalid credentials" });
        // }
        //generate token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.post("/register", async(req, res) => {
    try {
        console.log("Received Data:", req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newuser = new UserModel({
            ...req.body,
            password: hashedPassword  // Store the hashed password
        });
        //const newstd = new student(req.body);
        await newuser.save();
        res.status(201).json(newuser)
    } catch (err) {
        res.status(400).json({error:err.message});
    }
})

app.post('/add',async(req, res) => {
    try{
        console.log("Received data :", req.body)
        const {task, userId} = req.body;
        console.log(req.body.userId); // in your /add route

        const newtask = new TodoModel({task ,userId})
        await newtask.save();
        res.status(201).json(newtask)
    }catch(err){
        res.status(400).json({error:err.message})
    }
   
})

app.get('/list/:userId',async(req, res) =>{
    try{
        const result = await TodoModel.find({userId:req.params.userId});
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