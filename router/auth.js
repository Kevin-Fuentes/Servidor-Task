const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require('../middelware/auth')
router.post("/",
  authController.autenticarUsuario
);
//OBTIENE EL USUARIO AUTENTICADO
router.get('/',
auth,authController.usuarioAutenticado
)


module.exports = router;
