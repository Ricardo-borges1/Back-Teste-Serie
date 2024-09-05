/*******************************************************
 * DATA: 05/09/2024
 * Autor: Ricardo Borges
 * Versão: 1.1
*******************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAlunobyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_alunos where id = ${id}`;

        // Executa no banco de dados o script sql
        let rsAluno= await prisma.$queryRawUnsafe(sql);

            return rsAluno;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const selectAllAlunos = async function(){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_alunos where id > 0`;

        // Executa no banco de dados o script sql
        let rsAluno= await prisma.$queryRawUnsafe(sql);

            return rsAluno;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertAluno = async function(dadosAluno) {
    try {
        console.log(dadosAluno);

        let sql;

         sql = ` INSERT INTO tbl_alunos (
                            nome,
                            email,
                            senha,
                            telefone,
                            data_nascimento
                        ) 
         VALUES 
           ('${dadosAluno.nome}',
           '${dadosAluno.email}',
           '${dadosAluno.senha}',
           '${dadosAluno.telefone}',
           '${dadosAluno.data_nascimento}'
           )`; 
           
           console.log(sql);
           

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result){

            let lastID=await lastIDAluno()
            for (let aluno of dadosAluno.materia_id) {

                // Verificar se a combinação já existe
                let checkSql = `SELECT * FROM tbl_alunos_materias 
                                WHERE aluno_id = ${lastID[0].id} AND materia_id = ${aluno};`;

                let insert = await prisma.$queryRawUnsafe(checkSql);

                if (insert.length === 0) {
                    // Se não existe, insere
                    sql = `INSERT INTO tbl_alunos_materias (
                        aluno_id, 
                        materia_id
                    ) VALUES (
                        ${lastID[0].id},
                        ${aluno}
                    );`;

                    let insertResult = await prisma.$executeRawUnsafe(sql);

                    if (!insertResult) {
                        return false;
                    }
                }
            }

            return result;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

const lastIDAluno = async function(){
    try {
        let sql = `SELECT id FROM tbl_alunos ORDER BY id DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteAluno = async(id) =>{
    try{

        let sql = `delete from tbl_alunos where id = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteUsuario = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteUsuario
    
        } catch(error){
            return false
        }
}


module.exports ={
    selectAllAlunos,
    selectAlunobyID,
    lastIDAluno,
    deleteAluno,
    insertAluno

}

