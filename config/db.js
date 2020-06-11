const mongoose = require('mongoose')
require('dotenv').config({path:'.env'})

// const HOST = process.env.HOST
// const DBPORT = process.env.DBPORT
// const  DB = process.env.DB
const  MONGODB_URI = process.env.MONGODB_URI


const conectarDB =async ()=>{
try{
await mongoose.connect(MONGODB_URI,{
useNewUrlParser:true,
useFindAndModify:false,
useUnifiedTopology:true,
useCreateIndex:true
})
console.log('DB Conectada')
}catch(erro){
     console.log(error)
     process.exit(1)//SI HAY ERROR EN LA CONXECION SE DETIENE LA APP
}

}

module.exports = conectarDB