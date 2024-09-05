/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllMaterias = async function(){
    try {
        let sql = `select * from tbl_materias`;

        // Executa no banco de dados o script sql
        let rsMateria= await prisma.$queryRawUnsafe(sql);

            return rsMateria;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}

const selectMateriaByIdAluno = async function(id) {

    try {
        let sql = `   SELECT 
        m.id As id, m.materia AS materia
    FROM 
        tbl_alunos a
    JOIN 
        tbl_alunos_materias am ON a.id = am.aluno_id
    JOIN 
        tbl_materias m ON am.materia_id = m.id
    WHERE 
        a.id = ${id};`;

        // Executa no banco de dados o script sql
        let rsMateria= await prisma.$queryRawUnsafe(sql);

        console.log(rsMateria);

            return rsMateria;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}


const selectMateriaByIdProfessor = async function(id) {

    try {
        let sql = `   SELECT 
        m.id As id, m.materia AS materia
    FROM 
        tbl_professor a
    JOIN 
        tbl_professor_materias am ON a.id = am.professor_id
    JOIN 
        tbl_materias m ON am.materia_id = m.id
    WHERE 
        a.id = ${id};`

        // Executa no banco de dados o script sql
        let rsMateria= await prisma.$queryRawUnsafe(sql);

        console.log(rsMateria);

            return rsMateria;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}





module.exports ={
    selectAllMaterias,
    selectMateriaByIdAluno,
    selectMateriaByIdProfessor
}

