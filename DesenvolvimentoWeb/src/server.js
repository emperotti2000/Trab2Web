const express = require("express");
const cors = require("cors");
const todosRoutes = require("./todos.routes");
const app = express();

app.use(express.json());
app.use(todosRoutes);
app.use(cors());
app.get("/teste/", (req, res) => { 

    return res.json("Funcionando");
})

app.listen(3333, () => console.log("Servidor ativo na 3333"))

