import express from "express";
import UsersController from "./controllers/UsersController";

const routes = express.Router();

const usersInstance = new UsersController();

const methodNotAllowed = (req, res) => res.sendStatus(405);

routes.get("/alunos", usersInstance.index);
routes.get("/alunos/:id", usersInstance.show);
routes.post("/alunos", usersInstance.save);

routes.post("/alunos/:id", methodNotAllowed);
routes.put("/alunos", methodNotAllowed);
routes.delete("/alunos", methodNotAllowed);

export default routes;
