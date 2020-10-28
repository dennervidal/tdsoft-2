import express from "express";
import AlunoController from "./controllers/AlunoController";

const routes = express.Router();

const alunoController = new AlunoController();

const methodNotAllowed = (req, res) => res.sendStatus(405);

routes.get("/alunos", alunoController.index);
routes.post("/alunos", alunoController.save);
routes.get("/alunos/:id", alunoController.show);
routes.put("/alunos/:id", alunoController.update);
routes.delete("/alunos/:id", alunoController.delete);

routes.post("/alunos/:id", methodNotAllowed);
routes.put("/alunos", methodNotAllowed);
routes.delete("/alunos", methodNotAllowed);

export default routes;
