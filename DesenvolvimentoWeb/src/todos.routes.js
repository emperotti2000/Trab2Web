const express = require("express");
const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



//CRUD- Create, Read, Update, Delete

//Create
todosRoutes.post("/todos", async (request, response) => {
    const { name } = request.body;
    const todo = await prisma.todo.create({
        data: {
            name,
        }
    });
    //allTodos.push({ name, status: false }); 
    return response.status(201).json(todo);
});

//Remove

todosRoutes.get("/todos", async (request, response) => {
    const todos = await prisma.todo.findMany()
    return response.status(200).json(todos);
});

//Update
todosRoutes.put("/todos", async (request, response) => {
    const { name, id, status } = request.body;

    if (!id) {
        return response.status(400).json({ error: "ID é necessário" });
    }

    
    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });
    if (!todoAlreadyExist) {
        return response.status(404).json("Todo não existe");
    }

    
    const todo = await prisma.todo.update({
        where: {
            id,
        },
        data: { name, status }

    });
    return response.status(200).json(todo);
});

//Delete

todosRoutes.delete("/todos/:id", async (request, response) => {
    const { id } = request.params;
   
    const intId = parseInt(id);
    if (!intId) {
        return response.status(400).json({ error: "ID é necessário" });
    }
    const todoAlreadtExist = await prisma.todo.findUnique({ where: { id: intId } });
    if (!todoAlreadtExist) {
        return response.status(404).json("Todo não existe");
    }

    await prisma.todo.delete({ where: { id: intId } })
    return response.status(200).send();
 
});

    module.exports = todosRoutes;

