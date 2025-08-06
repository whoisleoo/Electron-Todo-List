import express from 'express'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes.js'

const app = express()
const porta = 7171

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json({
    message : "Bem vindo ao bequi endi da listagem de coisas"
  })
})

app.use('/', userRoutes)

app.listen(porta, () => {
  console.log(`=============== PAINEL BACKEND BERNARDO ================
     ATENÇÃO BACKEND BERNARDO ATIVADO ⚠️⚠️⚠️⚠️⚠️⚠️⚠️   
     BERNARDO RODANDO NA PORTA ${porta}
     =================================================================
     `)
})
