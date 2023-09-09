const dotEnv = require('dotenv');
dotEnv.config(); 

const port = process.env.PORT || 8000;
const databaseUrl = process.env.DATABASE_URL;

module.exports = {
    port,
    databaseUrl
}