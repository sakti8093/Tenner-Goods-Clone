import express from 'express'
import { login, register } from './Controllers/usercontroller.js'
import { connection } from './db.js'


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('WELCOME TO TENNER GOODS BACKEND')
})

app.post('/register', register)
app.post('/login', login)


app.listen(8080,(req,res)=>{
   try{
    connection();
    console.log('listening on port 8080');
   }catch(e){
    console.log(e);
   }
})