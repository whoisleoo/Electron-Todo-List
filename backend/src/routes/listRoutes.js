import express from 'express'
import { authentication } from '../middlewares/auth';
import { buscarList, createList, deleteList } from '../controllers/listController';

const router = express.Router()

// =============== CRIAR LISTA =========================
router.post('/list', authentication, createList );
// =============== GET LISTA =============================
router.get('/list', authentication, buscarList);
// =============== DELETAR LISTA =========================
router.delete('/list/:id', authentication, deleteList );





export default router;