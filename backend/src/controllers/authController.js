import { prisma } from "../database/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// =====================================================================
//                         REGISTRAR PIAZINHO
// =====================================================================

export const registrarUser = async function(req, res){
    const { username, email, senha, confSenha } = req.body

    try{
        if(senha !== confSenha){
           return res.status(400).json({
            error: "Senhas não coincidem."
           })
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email.toLowerCase().trim(),
                password: senhaHash,
                username: username.trim(),
            }
        });

        const { password: _, ...userFilter } = newUser;
        console.log(`Usuario ${userFilter.nome} foi criado.`)

        return res.status(200).json({
            message: "Deu boa pra cria um piazinho",
            user: userFilter
        })

    }catch(error){
        if(error.code === 'P2002'){
            const campo = error.meta?.target?.[0] || 'Algum campo ai'
          
                 return res.status(400).json({error: `${campo === 'email' ? 'Email' : 'CPF'} já está em uso.`})
            
        }
        res.status(500).json({
            error: "Deu algum erro ai n vou te contar qual"
        })
    }
}



// ====================================================================================================
//                                      ROTA DE LOGIN DE PIAZIN
// ====================================================================================================

export const loginUser = async function (req, res){
    const { username, password } = req.body;

    try{
    const user = await prisma.user.findUnique({
        where: { nome: nome.trim() },
        select: {
          id: true,
          email: true,
          password: true,
          username: true,
        }
    })
    if(!user){
       return res.status(401).json({error: "Usuário com esse email não encontrado"});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
       return res.status(401).json({error: "Email ou senha incorretos."})
    }

    const token = jwt.sign( 
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );

    const {password: _, ...userFilter } = user; 

    res.status(200).json({
        message: "Usuario logado com sucesso.",
        user: userFilter,
        token: token
    })



    }catch(error){
        res.status(500).json({
            message: "Erro interno no servidor.",
            erro: error.message
        })
    }
}


// ====================================================================================================
//                                      VERIFICA SE O TOKEN TA CERTO
// ====================================================================================================

export const verificarToken = async function (req, res){ 
    try{
        const { id } = req.user;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                senha: true,
                username: true,
            }
        });

        if(!user){
            return res.status(404).json({
                error: "Usuario não encontrado"
            })
        }


        res.status(200).json({
            message: "Token válido.",
            user: user
        })



    }catch(error){
        res.status(500).json({
            message: "Erro interno do servidor",
            error: error.message
        });
    }
}