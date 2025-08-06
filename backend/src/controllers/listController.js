import { prisma } from '../database/db.js'

// =====================================================================
//                         REGISTRAR LISTA
// =====================================================================

export const createList = async function(req, res){
    const { nome } = req.params;
    const userId = req.user.userId
    
    try{
        const newList = await prisma.list.create({
            data: {
                nome: nome.trim(),
                userId: userId
            }
        });


        res.status(200).json({
            message: "Lista criada com sucesso!",
            lista: newList
        })
    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        })
    }
}

// =====================================================================
//                         REGISTRAR LISTA
// =====================================================================

export const buscarList = async function(req, res){
    const userId = req.user.userId
    
    try{
        const allList = await prisma.list.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            message: "Buscando listas...",
            lista: allList,
            total: allList.length
        })
    }catch(error){
        res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        })
    }
}

// =====================================================================
//                         DELETAR LISTA
// =====================================================================

export const deleteList = async function(req, res){
    const { id } = req.params;
    const userId = req.user.userId;

    try{
        const listExist = await prisma.list.findFirst({
            where: { id: parseInt(id), userId: userId },
        });

        if(!listExist){
            return res.status(404).json({
                error: "Essa lista não existe."
            })
        }

        await prisma.list.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json({
            message: "Lista deletada com sucesso."
        })

    }catch(error){  
        res.status(500).json({
            error: "Erro interno no servidor.",
            message: error.message
        })
    }
    

}

