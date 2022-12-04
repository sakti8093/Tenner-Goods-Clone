import express from 'express'
import { login, register } from './Controllers/usercontroller.js'
import { connection } from './db.js'
import cors from 'cors'
import { mazma, tennergoods } from './Controllers/productcontroller.js'
import { addCart, delCart, getCart, updateCart } from './Controllers/cartcontroller.js'
import { search } from './Controllers/searchcontroller.js'

const app = express()

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('WELCOME TO TENNER GOODS BACKEND')
})

app.post('/register', register)
app.post('/login', login)
app.get('/mazma', mazma)
app.get('/tennergoods', tennergoods)
app.get('/cart/:userid',getCart)
app.post('/cart' , addCart)
app.patch('/cart/:id',updateCart)
app.delete('/cart/:id',delCart)
app.post('/search',search)


app.listen(8080,(req,res)=>{
   try{
    connection();
    console.log('listening on port 8080');
   }catch(e){
    console.log(e);
   }
})