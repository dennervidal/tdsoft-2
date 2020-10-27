import { Request, Response } from "express";
import knex from "../database/connection";

class UsersController {
  async index(request: Request, response: Response) {
    const { limite = 25, pagina = 1, nome = "" } = request.query;

    if (
      typeof limite !== "number" ||
      typeof pagina !== "number" ||
      typeof nome !== "string"
    ) {
      return response.sendStatus(400);
    }

    const users = await knex("users")
      .where("nome", "like", `%${nome}%`)
      .offset(pagina)
      .limit(limite);

    return response.status(200).json(users);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await knex("users").where("id", id).first();

    if (!user) {
      return response.sendStatus(404);
    }

    return response.status(200).json(user);
  }

  async save(request: Request, response: Response) {
    const { rga, nome, curso = null } = request.body;

    if (!!rga || !!nome) {
      return response.sendStatus(400);
    }

    const trx = await knex.transaction();

    const user = await trx("users").insert({ rga, nome, curso });

    try {
      await trx.commit();
    } catch (e) {
      console.error(e);
      return response.sendStatus(500);
    }

    return response.status(201).json(user);
  }
}

export default UsersController;
