import { prisma } from '../database/db.js'

// =====================================================================
//                         REGISTRAR LISTA
// =====================================================================

export const createList = async function(req, res){
    const { nome } = req.body;
    const userId = req.user.id

    if(!nome){
        return res.status(400).json({
            error: "Nome não especificado."
        })
    }
    
    try{
        const newList = await prisma.list.create({
            data: {
                name: nome.trim(),
                userId: userId
            }
        });


        return res.status(200).json({
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
//                         BUSCAR LISTA
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

        return res.status(200).json({
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

        return res.status(200).json({
            message: "Lista deletada com sucesso."
        })

    }catch(error){  
        res.status(500).json({
            error: "Erro interno no servidor.",
            message: error.message
        })
    }
    

}

// =====================================================================
//                         UPDATAR LISTA
// =====================================================================

export const updateList = async function (req, res){
    const { nome } = req.body;
    const { id } = req.params;
    const userId = req.user.id

    if(!nome){
        return res.status(401).json({
            error: "Nome não especificado."
        })
    }

    try{
        const lista = await prisma.list.findFirst({
            where: { id: parseInt(id), userId: userId }

        })

        if(!lista){
            return res.status(401).json({
                error: "Essa lista não existe."
            })
        }

        await prisma.list.update({
            where: { id: parseInt(id) },
                data: {
                name: nome.trim()
            }
        })

        return res.status(200).json({
            message: "Nome da lista alterada com sucesso"
        })


    }catch(error){
        return res.status(500).json({
            error: "Erro interno do servidor",
            message: error.message
        })
    }
}