import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("users").insert([
    {
      nome: "João",
      rga: "2020.1907.011-2",
      curso: "Sistemas de Informação",
    },
    {
      nome: "Maria",
      rga: "2020.1907.011-3",
      curso: "Engenharia de Software",
    },
  ]);
}
