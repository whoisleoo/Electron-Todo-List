import express from 'express'
import { authentication } from '../middlewares/auth.js';
import { buscarList, createList, deleteList, updateList } from '../controllers/listController.js';

const router = express.Router()

// =============== CRIAR LISTA =========================
router.post('/list', authentication, createList );
// =============== GET LISTA =============================
router.get('/list', authentication, buscarList);
// =============== DELETAR LISTA =========================s
router.delete('/list/:id', authentication, deleteList );
// =============== DELETAR LISTA =========================
router.put('/list/:id', authentication, updateList );





export default router;