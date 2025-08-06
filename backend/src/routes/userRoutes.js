import express from 'express'
import { loginUser, registrarUser } from '../controllers/authController.js';
import { validarLogin, validarRegistro } from '../middlewares/validation.js';

const router = express.Router()

// =============== ROTA DE REGISTRO =========================
router.post('/register', validarRegistro, registrarUser );
// =============== ROTA DE LOGIN =============================
router.post('/login', validarLogin, loginUser);




export default router;