import express from 'express'
import { loginUser, registrarUser } from '../controllers/authController.js';

const router = express.Router()

// =============== ROTA DE REGISTRO =========================
router.post('/register', registrarUser );
// =============== ROTA DE LOGIN =============================
router.post('/login', loginUser);




export default router;