const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(3031, () => {
    console.log(`Servidor rodando na porta: http://localhost:3031`);
});