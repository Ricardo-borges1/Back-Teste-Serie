/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllMembros = async function(){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `SELECT 
    a.id AS aluno_id,
    a.nome AS aluno_nome,
    a.email AS aluno_email,
    gm.nome AS grupo_mentoria_nome
FROM 
    tbl_membros m
JOIN 
    tbl_alunos a ON m.aluno_id = a.id
JOIN 
    tbl_grupo_mentoria gm ON m.grupo_mentoria_id = gm.id;`;

        // Executa no banco de dados o script sql
        let rsMembros= await prisma.$queryRawUnsafe(sql);

            return rsMembros;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}


const selectByIdMembro =async function(id){
    try {
        let sql=`SELECT 
    a.id AS aluno_id,
    a.nome AS aluno_nome,
    a.email AS aluno_email,
    gm.nome AS grupo_mentoria_nome
FROM 
    tbl_membros m
JOIN 
    tbl_alunos a ON m.aluno_id = a.id
JOIN 
    tbl_grupo_mentoria gm ON m.grupo_mentoria_id = gm.id
WHERE 
    gm.id IN ${id}`
        let rsMateria = await prisma.$queryRawUnsafe(sql)
        return rsMateria
    } catch (error) {
        return false
    }
}

module.exports ={
    selectAllMembros,
    selectByIdMembro
}
