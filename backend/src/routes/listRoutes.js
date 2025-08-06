import express from 'express'
import { authentication } from '../middlewares/auth.js';
import { buscarList, createList, deleteList } from '../controllers/listController.js';

const router = express.Router()

// =============== CRIAR LISTA =========================
router.post('/list', authentication, createList );
// =============== GET LISTA =============================
router.get('/list', authentication, buscarList);
// =============== DELETAR LISTA =========================
router.delete('/list/:id', authentication, deleteList );





export default router;