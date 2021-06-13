
const configiracaoSQL = {
  server: "localhost",
  database: "ProvIna_Database",
  user: "sa",
  password: "root",
  port: 1433,
  dialect: "mssql",
  options: {
    "encrypt": true,
    "enableArithAbort": true,
    "trustServerCertificate": true
    }
};

module.exports = configiracaoSQL;