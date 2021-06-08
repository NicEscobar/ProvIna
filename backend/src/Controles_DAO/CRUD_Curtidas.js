const sql = require('mssql');
const configuracaoSQL = require('../config/ConexaoSQL');

module.exports = {
  
    async SQL_InserirCurtidas (request, response){
       
      const {IdArquivo, IdAluno, Curtida} = request.body; 

      var conn = new sql.ConnectionPool(configuracaoSQL);

      conn.connect(function(err){
  
        if (err) throw err;
  
        console.log("Conectado!")
                  
        var req =  new sql.Request(conn);
    
        var comando = ` INSERT INTO [ProvIna_Database].[dbo].[Curtidas] 
                            ([IdArquivo], [IdAluno], [Curtida])
                        VALUES (${IdArquivo},${IdAluno},${Curtida});`;
          
        req.query(comando, function (err, resposta) {
            
          if(err) throw err;

            response.json(resposta);
            conn.close();
          });
        });
    }
}