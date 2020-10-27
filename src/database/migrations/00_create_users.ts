import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.string("rga").notNullable();
    table.string("curso");
    table.enu("situacao", ["ativo", "inativo"]).defaultTo("ativo");
    table.timestamp("registrado_em").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
