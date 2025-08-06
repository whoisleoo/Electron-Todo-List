import jwt from 'jsonwebtoken'


export const authentication = async function (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // formato do beaer

    if(!token){
        return res.status(401).json({
            error: "Token de acesso negado.",
            message: "Você precisa estar logado para executar essa ação."
        });
    }

    try{
        const decript = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decript.id,
            username: decript.username
        }

        console.log(`Usuario autenticado ${decript.username} com o id: ${decript.id}`)

        next()

    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        })
    }
}