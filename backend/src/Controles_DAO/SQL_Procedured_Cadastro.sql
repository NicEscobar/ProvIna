USE [ProvIna_Database]
GO
/****** Object:  StoredProcedure [dbo].[Verificacao_Aluno]    Script Date: 24/05/2021 11:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Verificacao_Aluno]
@nome VARCHAR (255),
@email VARCHAR (45),
@senha VARCHAR (45)

AS

BEGIN TRY  

 BEGIN TRAN  	 
	
	DECLARE @Flag INT;

	SET @Flag =  
		CASE  
			WHEN EXISTS(SELECT * FROM ProvIna_Database.dbo.Aluno AS A   
						WHERE A.Email = @email)   
			THEN 1
			ELSE 0
		END
	
	IF (@Flag = 0)
		INSERT INTO ProvIna_Database.dbo.Aluno (Nome, Senha, Email) 
		VALUES (@nome,@senha,@email)

	SELECT @Flag AS FLAG

	COMMIT
END TRY 
BEGIN CATCH  
    SELECT ERROR_MESSAGE();  
    THROW  
END CATCH   