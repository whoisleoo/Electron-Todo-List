import express from 'express'
import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'
import jtw from 'jsonwebtoken'
import cors from 'cors'

const app = express()
const porta = 7171

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./users.db');


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
