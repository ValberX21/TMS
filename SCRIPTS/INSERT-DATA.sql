INSERT INTO MERCADORIA_ENTRADA
           (MERCAD_NOME
           ,FABRICANTE
           ,TIPO
           ,DESCRICAO
           ,DATA
           ,QUANTIDADE
           ,LOCAL)
     VALUES
           ('Samsung J8'
           ,'Samsung'
           ,'Eletronic'
           ,'Mercadoria nova'
           --,  CURRENT_TIMESTAMP('yyyy-mm-dd hh:mm:ss')
		   ,GETDATE()
           ,2
           ,'Brasil')



		INSERT INTO [dbo].[MERCADORIA_SAIDA]
           ([MERCAD_NOME]
           ,[QUANTIDADE]
           ,[DATA])
     VALUES
           ('PenDrive'
           ,12
           ,GETDATE())
GO


		