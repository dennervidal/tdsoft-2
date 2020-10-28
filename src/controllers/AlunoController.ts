import { Request, Response } from "express";
import AlunoService from "../services/AlunoService";

const alunoService = new AlunoService();

class AlunoController {
  async index(request: Request, response: Response) {
    const { limite = 25, pagina = 1, nome = "" } = request.query;

    if (
      isNaN(Number(limite)) ||
      isNaN(Number(pagina)) ||
      typeof nome !== "string"
    ) {
      return response.sendStatus(400);
    }

    const alunos = await alunoService.findAllAlunosWithNamePaginated(
      nome,
      pagina,
      limite
    );

    return response.status(200).json(alunos);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const aluno = await alunoService.findAlunoById(id);

      return response.status(200).json(aluno);
    } catch (e) {
      console.error(e);
      return response.sendStatus(404);
    }
  }

  async save(request: Request, response: Response) {
    const { rga, nome, curso = null } = request.body;

    // TODO: Necessário testar o rga para expressão regular dddd.dddd.ddd-d /(\d{4}[.]\d{4}[.]\d{3}[-]\d)/g

    if (!rga || !nome) {
      return response.sendStatus(400);
    }

    try {
      const alunoId = await alunoService.create(rga, nome, curso);

      // Parâmetro returning do knex não suporta sqlite
      const aluno = await alunoService.findAlunoById(alunoId);

      return response.status(201).json(aluno);
    } catch (e) {
      console.error(e);
      return response.sendStatus(500);
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const aluno = await alunoService.findAlunoById(id);
      await alunoService.delete(id);

      console.log(aluno);

      return response.status(200).json(aluno);
    } catch (e) {
      console.error(e);
      return response.sendStatus(404);
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      rga = null,
      nome = null,
      curso = null,
      situacao = null,
    } = request.body;

    try {
      await alunoService.update(id, rga, nome, curso, situacao);

      const aluno = await alunoService.findAlunoById(id);

      console.log(aluno);

      return response.status(200).json(aluno);
    } catch (e) {
      console.error(e);
      return response.sendStatus(404);
    }
  }
}

export default AlunoController;
