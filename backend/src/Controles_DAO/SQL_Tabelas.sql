USE [ProvIna_Database]
GO

CREATE TABLE [dbo].[Aluno](
	[IdAluno] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](255) NOT NULL,
	[Senha] [varchar](45) NOT NULL,
	[Email] [varchar](45) NOT NULL,
 CONSTRAINT [PK_IdAluno] PRIMARY KEY CLUSTERED (IdAluno) )

 CREATE TABLE [dbo].[Arquivo](
	[IdArquivos] [int] IDENTITY(1,1) NOT NULL,
	[IdAluno_Arquivos] [int] NOT NULL,
	[NomeArquivo] [varchar](45) NOT NULL,
	[Categoria] [varchar](45) NOT NULL,
	[DataCriacao] [datetime] NOT NULL,
	[URLs] [varchar](45) NOT NULL,
	[NumeroCurtidas] [int] NULL,
 CONSTRAINT [PK_IdArquivos] PRIMARY KEY CLUSTERED (IdArquivos))

 CREATE TABLE [dbo].[Comentario](
	IdComentario [int] IDENTITY(1,1) NOT NULL,
	DataPostagem datetime NOT NULL,
	IdAluno_Comentario [int] NOT NULL,
	IdArquivo_Comentario [int] NOT NULL,
 CONSTRAINT [PK_IdComentario] PRIMARY KEY CLUSTERED (IdComentario),
 CONSTRAINT FK_IdAluno_Comentario FOREIGN KEY (IdAluno_Comentario)
 REFERENCES Aluno(IdAluno)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	CONSTRAINT FK_IdArquivo_Comentario FOREIGN KEY (IdArquivo_Comentario)
 REFERENCES Arquivo(IdArquivos)
        ON DELETE CASCADE
        ON UPDATE CASCADE
 )
 
  insert into [ProvIna_Database].[dbo].[Aluno] ([Nome],[Senha],[Email]) VALUES ('Nicole','123','ni@')

  
 insert into [ProvIna_Database].[dbo].[Arquivo] ([IdAluno_Arquivos],[NomeArquivo],[Categoria],[DataCriacao],[URLs],[NumeroCurtidas]) 
  VALUES (1,'prova','calculo', '03/04/2021','url',3)


  //---------------------------Procedure
  
CREATE PROCEDURE Verificacao_Aluno
@nome VARCHAR (255),
@email VARCHAR (45),
@senha VARCHAR (45)

AS


BEGIN
	  DECLARE @flag int;
	   SET @flag =
			CASE
				WHEN EXISTS(SELECT Email FROM [ProvIna_Database].[dbo].[Aluno] as A WHERE A.Email = 'ta@')   
					THEN 1   
				ELSE 0
			END

		IF @flagi 1 
				INSERT INTO [ProvIna_Database].[dbo].[Aluno] (Nome, Email, Senha) VALUES ('tati', 'ta@', '123')
		
		SELECT * FROM [ProvIna_Database].[dbo].[Aluno] as A WHERE A.Email = 'ta@'

END;

