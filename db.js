import mongoose from 'mongoose'

export const connection=async() =>{
    try{
        mongoose.connect(
            'mongodb+srv://saktiprasad:Sakti2000@cluster0.qolurkm.mongodb.net/TGoods?retryWrites=true&w=majority',
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            },
            console.log("DB Connection ESTABLISHED")
        )
    }catch(err){
        console.log(err)
    }
}