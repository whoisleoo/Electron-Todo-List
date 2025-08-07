import jwt from 'jsonwebtoken'

/*
essa função basicamente puxa o token do usuario logado, descriptografa o token e puxa todos os dados como o ID do usuario, nome, e essas coisinhas
depois envia pra requisição pra rodar direito os dado
*/

export const authentication = async function (req, res, next){
    const authHeader = req.headers['authorization'] // Puxa o header com o nome de authorization (onde fica o token)
    const token = authHeader && authHeader.split(' ')[1] // formato do beaer

    if(!token){
        return res.status(401).json({
            error: "Token de acesso negado.",
            message: "Você precisa estar logado para executar essa ação."
        });
    }

    try{
        const decript = jwt.verify(token, process.env.JWT_SECRET); // descriptografa o token
        req.user = { // manda o id decriptado junto com o usarname
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