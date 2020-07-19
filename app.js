const express = require('express')
const app = express()
const socket = require('socket.io')
const mongoose = require('mongoose')

app.get('/',(req,res)=>{
    res.send("hi")
})

const port = process.env.PORT

const expressServer = app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})

const io = socket(expressServer)
mongoose.connect("mongodb://localhost:27017/typefast",
    {useNewUrlParser: true, useUnifiedTopology:true,},
    ()=>{
        console.log("Database connected")
})