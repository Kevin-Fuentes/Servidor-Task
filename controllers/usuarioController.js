const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //REVISAR SI HAY ERRORES
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    //REVISAR QUE EL USUARIO SEA UNICO
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //CREAR NUEVO USUARIO
    usuario = new Usuario(req.body);

    //HASHEAR EL PASSWOORD
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //GUARDAR USUARIO
    await usuario.save();

    //CREAR Y FIRMAR
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

  
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
