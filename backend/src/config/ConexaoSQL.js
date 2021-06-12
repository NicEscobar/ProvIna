
const configiracaoSQL = {
  server: "localhost",
  database: "ProvIna_Database",
  user: "sa",
  password: "123",
  port: 1433,
  dialect: "mssql",
  options: {
    "encrypt": true,
    "enableArithAbort": true,
    "trustServerCertificate": true
    }
};

module.exports = configiracaoSQL;