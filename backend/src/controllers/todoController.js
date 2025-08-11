import { prisma } from '../database/db.js'

/*
Pegar o listId dos parâmetros da rota
Verificar se a lista pertence ao usuário
Buscar todos apenas por listId
*/

// =====================================================================
//                         BUSCAR TODO
// =====================================================================

export const buscarTodo = async function(req, res){
    const userId = req.user.id
    const { listId } = req.params;
    try{

        const findList = await prisma.list.findFirst({
            where: { id: parseInt(listId), userId: userId}
        })
        
        if(!findList){
            return res.status(404).json({
                error: "Não há nenhuma lista com esse ID."
            })
        }

        const allTodo = await prisma.todo.findMany({
            where: { listId: parseInt(listId)},
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

// =====================================================================
//                         CRIAR TODO
// =====================================================================

export const createTodo = async function(req, res){
    const { text } = req.body
    const userId = req.user.id
    const { listId } = req.params;
    try{

        if(!text){
            return res.status(404).json({
                error: "Nome não especificado."
            })
        }

        const findList = await prisma.list.findFirst({
            where: { id: parseInt(listId), userId: userId}
        })
        
        if(!findList){
            return res.status(404).json({
                error: "Você não possui permissão para ver essa lista."
            })
        }

        const newTodo = await prisma.todo.create({
            data: {
                text: text.trim(),
                listId: parseInt(listId)
            }

        });


        return res.status(201).json({
            message: "Todo criada com sucesso",
            todo: newTodo,
            list: findList.name
        })
    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        })
    }
}


// =====================================================================
//                         PUT TODO
// =====================================================================

export const updateTodo = async function(req, res){
    const { completed } = req.body
    const userId = req.user.id
    const { listId, todoId } = req.params;
    try{


        if(completed === null || completed === undefined){
            return res.status(400).json({
                error: "Status é obrigatório."
            })
        }

        const findList = await prisma.list.findFirst({
            where: { id: parseInt(listId), userId: userId}
        })
        
        if(!findList){
            return res.status(404).json({
                error: "Você não possui permissão para ver essa lista."
            })
        }


        const todoExists = await prisma.todo.findFirst({
            where: { id: parseInt(todoId), listId: parseInt(listId) }
        })

        if(!todoExists){
            return res.status(404).json({
                error: "Você não possui permissão para ver esse Todo."
            })
        }

        const updateTodo = await prisma.todo.update({
            where: { id: parseInt(todoId)},
            data: {
                completed: completed
            }

        });


        return res.status(200).json({
            message: "Todo atualizado com sucesso",
            todo: updateTodo,
            list: findList.name
        })
    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        })
    }
}


// =====================================================================
//                         DELETE TODO
// =====================================================================

export const deleteTodo = async function(req, res){
    const userId = req.user.id
    const { listId, todoId } = req.params;
    try{


        const findList = await prisma.list.findFirst({
            where: { id: parseInt(listId), userId: userId}
        })
        
        if(!findList){
            return res.status(404).json({
                error: "Você não possui permissão para ver essa lista."
            })
        }


        const todoExists = await prisma.todo.findFirst({
            where: { id: parseInt(todoId), listId: parseInt(listId) }
        })

        if(!todoExists){
            return res.status(404).json({
                error: "Você não possui permissão para ver esse Todo."
            })
        }

        const deleteTodo = await prisma.todo.delete({
            where: { id: parseInt(todoId)},
        });


        return res.status(200).json({
            message: "Todo deletado com sucesso",
        })
    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        })
    }
}