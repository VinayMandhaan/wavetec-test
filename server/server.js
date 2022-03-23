const express = require('express')
const connectDB = require('./config/db')
const app = express();
var cors = require('cors')
const path = require('path')
app.use(cors())

connectDB();

const PORT = process.env.PORT || 5000

app.use(express.json({
    extended: false
}))

app.get('/',(req,res)=>{
    res.send('API Running')
})

app.use('/api/auth',require('./controller/api/auth'))
app.use('/api/user',require('./controller/api/user'))
app.use('/api/tasks',require('./controller/api/tasks'))

app.listen(PORT, ()=>{
    console.log(`Server Started on Port ${PORT}`)
})