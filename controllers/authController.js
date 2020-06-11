const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async(req,res)=>{
      //REVISAR SI HAY ERRORES
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }


 //EXTRAER EL EMAIL Y PASWWORD
 const {email,password}=req.body 

try{
//REVISAR QUE EL USUARIO ESTE REGISTRADO
let usuario =  await Usuario.findOne({email})
if(!usuario){
     return res.status(400).json({msg:'El usuario no existe'})
}

//REVISAR PASSWORD 
const passCorrecto = await bcryptjs.compare(password,usuario.password)

if(!passCorrecto){
     return res.status(400).json({msg:'Password incorrecto'})
}

//SI TODO ES CORRECTO  CREAR Y FIRMAR JWT
const payload = {
     usuario:{
          id:usuario.id
     }
};

//FIRMAR EL JWT
jwt.sign(
  payload,
  process.env.SECRETA,
  {
    expiresIn: 3600,
  },
  (error, token) => {
    if (error) throw error;
    //MENSAJE DE CONFIRMACION
    res.json({ token });
  }
);


}catch(error){
     console.log(error)
}

}


exports.usuarioAutenticado = async(req,res)=>{
     try{
const usuario = await Usuario.findById(req.usuario.id).select('-password')
res.json({usuario})
     }catch(error){
          console.log(error)
          res.status(500).jdon({msg:'hubo un error'})
     }
}