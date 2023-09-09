const { app, } = require("./app");
const { databaseConnect } = require("./config/db");
const { port } = require("./secret");

app.listen( port, async () => {
    console.log(`Server is Running Successfully at http://localhost:${port}`);
    await databaseConnect()
});