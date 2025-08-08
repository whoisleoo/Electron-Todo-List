import express from 'express'
import { authentication } from '../middlewares/auth.js';
import { buscarTodo, createTodo, deleteTodo, updateTodo } from '../controllers/todoController.js';
const router = express.Router()

// =============== GET TODO =========================
router.get('/list/:listId/todo', authentication, buscarTodo)

// =============== POST TODO ========================
router.post('/list/:listId/todo', authentication, createTodo)

// =============== PUT TODO =========================
router.put('/list/:listId/todo/:todoId', authentication, updateTodo)

// =============== DELETE TODO ======================
router.delete('/list/:listId/todo/:todoId', authentication, deleteTodo)



export default router;