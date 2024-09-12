/*******************************************************
 * DATA: 12/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllMentores = async function(){
    try {
        let sql = `select * from tbl_mentor`;

        // Executa no banco de dados o script sql
        let rsMentor= await prisma.$queryRawUnsafe(sql);

            return rsMentor;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
}

const selectAlunoMentorById = async function(id) {

    console.log(id);
    try {
        let sql = ` SELECT 
    alunos.id AS aluno_id,
    alunos.nome AS aluno_nome,
    mentores.id AS mentor_id,
    mentores.data_ingresso AS mentor_data_ingresso
FROM 
    tbl_aluno_mentor AS aluno_mentor
JOIN 
    tbl_alunos AS alunos ON aluno_mentor.aluno_id = alunos.id
JOIN 
    tbl_mentor AS mentores ON aluno_mentor.mentor_id = ${id};`

        // Executa no banco de dados o script sql
        let rsMentor = await prisma.$queryRawUnsafe(sql);

        console.log('oioiiiiiiiiioioioi' + rsMentor);

            return rsMentor;
    
        } catch (error) {
            console.log('caindo qui');
            return false;
            
        }
}



const selectProfessorMentorById = async function(id) {

    console.log(id);
    try {
        let sql = `     SELECT 
		professores.id AS professor_id,
        professores.nome AS professor_nome,
        mentores.id AS mentor_id,
        mentores.data_ingresso AS mentor_data_ingresso
        FROM 
        tbl_professor_mentor AS professor_mentor
        JOIN
         tbl_professor AS professores ON professor_mentor.professor_id = professores.id
JOIN 
    tbl_mentor AS mentores ON professor_mentor.mentor_id = ${id};`

        // Executa no banco de dados o script sql
        let rsMentor = await prisma.$queryRawUnsafe(sql);

        console.log('oioiiiiiiiiioioioi' + rsMentor);

            return rsMentor;
    
        } catch (error) {
            console.log('caindo qui');
            return false;
            
        }
}



module.exports ={
   selectAllMentores,
   selectAlunoMentorById,
   selectProfessorMentorById
}

