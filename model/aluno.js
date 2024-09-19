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
        let sql = `SELECT 
    a.id AS aluno_id,
    a.nome AS aluno_nome,
    a.email AS aluno_email,
    a.data_nascimento AS aluno_data_nascimento,
    a.telefone AS aluno_telefone,
    s.nome AS serie_nome
FROM 
    tbl_alunos a
LEFT JOIN 
    tbl_series s ON a.serie = s.id
WHERE 
    a.id = ${id}`;

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
        let sql = `SELECT 
    tbl_alunos.id AS aluno_id,
    tbl_alunos.nome AS aluno_nome,
    tbl_alunos.email,
    tbl_alunos.senha,
    tbl_alunos.data_nascimento,
    tbl_alunos.telefone,
    tbl_alunos.serie,
    tbl_series.nome AS serie_nome
FROM 
    tbl_alunos
LEFT JOIN 
    tbl_series ON tbl_alunos.serie = tbl_series.id;
`;

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
        let sql = `INSERT INTO tbl_alunos (
                        nome,
                        email,
                        senha,
                        telefone,
                        data_nascimento,
                        serie
                    ) 
                    VALUES (
                        '${dadosAluno.nome}',
                        '${dadosAluno.email}',
                        '${dadosAluno.senha}',
                        '${dadosAluno.telefone}',
                        '${dadosAluno.data_nascimento}',
                        ${dadosAluno.serie}
                    )`;

        // Executa o SQL para inserir o aluno
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            // Obtém o ID do último aluno inserido
            let lastID = await lastIDAluno();
            
            // Insere as matérias associadas
            for (let materiaId of dadosAluno.materia_id) {
                let insertMateriaSql = `INSERT INTO tbl_alunos_materias (
                                            aluno_id,
                                            materia_id
                                        ) 
                                        VALUES (
                                            ${lastID[0].id},
                                            ${materiaId}
                                        )`;

                await prisma.$executeRawUnsafe(insertMateriaSql);
            }

            return result;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};


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

