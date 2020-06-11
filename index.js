const express = require('express')
const conectarDb = require('./config/db')
const cors = require('cors')
//CREAR EL SERVIDOR 
const app = express()

//CONEXION BASE DE DATOS
conectarDb()

//HABILITAR CORS
const whiteList=['http://localhost:3000']

const corsOptions={

origin: (origin,callback)=>{
const existe = whiteList.some(dominio=> dominio===origin)
if(existe){
     callback(null,true)
}else{
callback(new Error('No Permitido por CORS'))
}

} 
}

app.use(cors())

//HABILITAR EXPRRES.JSON
app.use(express.json({extended:true}))

//PUERTO DE NUESTRO SERVIDOR
const port = process.env.PORT || 4000

//RUTAS
app.use('/api/usuarios',require('./router/usuarios'))
app.use('/api/auth',require('./router/auth'))
app.use('/api/proyectos',require('./router/proyectos'))
app.use('/api/tareas',require('./router/tareas'))


//EJECUTAR LA APP
app.listen(port,'0.0.0.0',()=>{
     console.log('Conectado en el puerto:',port)
})

