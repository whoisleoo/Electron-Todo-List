import express from 'express'
import bcrypt from 'bcrypt'
import jtw from 'jsonwebtoken'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const porta = 7171

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(porta, () => {
  console.log(`=============== PAINEL BACKEND BERNARDO ================
     ATENÇÃO BACKEND BERNARDO ATIVADO ⚠️⚠️⚠️⚠️⚠️⚠️⚠️   
     BERNARDO RODANDO NA PORTA ${porta}
     =================================================================
     `)
})
