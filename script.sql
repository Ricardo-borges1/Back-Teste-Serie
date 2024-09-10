create database StudyFY;

use StudyFY;

create table tbl_materias(
id int auto_increment primary key not null,
nome_materia varchar(90)
);

create table tbl_alunos(
id int auto_increment primary key not null,
nome varchar(90),
email varchar(256),
senha varchar(25) not null,
data_nascimento date not null,
telefone varchar(20) not null,
serie varchar (20) not null
);

create table tbl_alunos_materias(
id int auto_increment not null primary key,
aluno_id int not null,
materia_id int not null,
foreign key (aluno_id) references tbl_alunos(id),
foreign key (materia_id) references tbl_materias(id)
);


create table tbl_professor (
    id int auto_increment primary key not null,
	nome varchar(90),
	email varchar(256),
	senha varchar(25) not null,
	data_nascimento date not null,
	telefone varchar(20) not null
    );
    
    CREATE TABLE tbl_professor_materias (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    professor_id INT NOT NULL,
    materia_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES tbl_professor(id),
    FOREIGN KEY (materia_id) REFERENCES tbl_materias(id)
);



 ------------------------------------------------------------------------------------------------------------
Insert into tbl_alunos(nome, email, senha, data_nascimento, telefone,serie)
values
("teste1", "teste@teste", "123", "2034-08-24", "11-65534-9475", "9° EF");

Insert into tbl_materias(nome_materia)
values
("Matemática"),
("Português"),
("Historia");


Insert into tbl_alunos_materias(aluno_id, materia_id)
values
(1,1),
(1,3);


        
        INSERT INTO tbl_alunos_materias (
                aluno_id,
                materia_id
            )
        VALUES

        (
        1,
        2
        );
        
        
         INSERT INTO tbl_professor (
                            nome,
                            email,
                            senha,
                            telefone,
                            data_nascimento
                        ) 
         VALUES 
           ("edilton",
           'edilton@example.com',
           'edilton123',
           '11998249607',
           '2018-02-03'
           );
           
           
 INSERT INTO tbl_professor_materias (
                professor_id,
                materia_id
            )
        VALUES
        (
        2,
        2
        );
        
        INSERT INTO tbl_alunos (
                            nome,
                            email,
                            senha,
                            telefone,
                            data_nascimento,
                            serie
                        ) 
         VALUES 
           ("edilton",
           'edilton@example.com',
           'edilton123',
           11998249607,
           '2018-02-03',
           'História'
           );
         ----------------------------------------------------------------------------------------------------

select * from tbl_professor;
        
        
        SELECT 
    m.id AS id, 
    m.nome_materia AS materia
FROM 
    tbl_alunos a
JOIN 
    tbl_alunos_materias am ON a.id = am.aluno_id
JOIN 
    tbl_materias m ON am.materia_id = m.id
WHERE 
    a.id = 1;
    
    
    
     SELECT 
        m.id As id, m.nome_materia AS materia
    FROM 
        tbl_professor a
    JOIN 
        tbl_professor_materias am ON a.id = am.professor_id
    JOIN 
        tbl_materias m ON am.materia_id = m.id
    WHERE 
        a.id = 1;
        
        
        UPDATE tbl_alunos
                   SET nome = 'aaaa',
                       email = 'aaaaaa@sssss.com',
                       senha = '11111',
                       telefone = '11998249607',
                       data_nascimento = '2018-02-03',
                       serie = '3°EM'
                   WHERE id = 1;


select * from tbl_alunos;
        
   ----------------------------------------------------------------------------------------------------------------------------------     
        
        
        
        DELIMITER //

CREATE PROCEDURE CadastrarAluno (
    IN p_nome VARCHAR(90),
    IN p_email VARCHAR(256),
    IN p_senha VARCHAR(25),
    IN p_telefone VARCHAR(20),
    IN p_data_nascimento DATE,
    IN p_materia_ids TEXT
)
BEGIN
    DECLARE aluno_id INT;

    -- Inserir novo aluno
    INSERT INTO tbl_alunos (nome, email, senha, telefone, data_nascimento)
    VALUES (p_nome, p_email, p_senha, p_telefone, p_data_nascimento);

    -- Obter o ID do aluno inserido
    SET aluno_id = LAST_INSERT_ID();

  

DELIMITER ;
        
        
        -- deletar a relação
        delete from tbl_alunos where id IN (2);
        
		select * from tbl_alunos where id > 0;
        select cast(last_insert_id() AS DECIMAL) as id from tbl_materias limit 1;
        

DELIMITER //


CREATE TRIGGER apagar_aluno_materias
BEFORE DELETE ON tbl_alunos
FOR EACH ROW
BEGIN
    -- Apagar as matérias relacionadas ao aluno na tabela de relacionamento
    DELETE FROM tbl_alunos_materias WHERE aluno_id = 2;
END //
DELIMITER ;



DELIMITER //

CREATE TRIGGER apagar_professor_materias
BEFORE DELETE ON tbl_professor
FOR EACH ROW
BEGIN
    -- Apagar as matérias relacionadas ao professor na tabela de relacionamento
    DELETE FROM tbl_professor_materias WHERE professor_id = 2;
END //

DELIMITER ;