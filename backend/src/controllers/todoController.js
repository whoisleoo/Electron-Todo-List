import { prisma } from '../database/db.js'

/*
Pegar o listId dos parâmetros da rota
Verificar se a lista pertence ao usuário
Buscar todos apenas por listId
*/

export const buscarTodo = async function(req, res){
    const userId = req.user.id
    const { listId } = req.params;
    try{

        const findList = await prisma.list.findFirst({
            where: { id: parseInt(listId), userId: userId}
        })
        
        if(!findList){
            return res.status(404).json({
                error: "Você não possui permissão para ver essa lista."
            })
        }

        const allTodo = await prisma.todo.findMany({
            where: { id: parseInt(listId)},
            orderBy: { createdAt: 'desc'}

        });


        return res.status(200).json({
            message: "Buscando todos...",
            todos: allTodo,
            total: allTodo.length,
            list: findList.name
        })
    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        })
    }
}