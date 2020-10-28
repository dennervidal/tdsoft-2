import knex from "../database/connection";

class AlunoService {
  async findAllAlunosWithNamePaginated(nome, pagina, limite) {
    return knex("aluno")
      .where("nome", "like", `%${nome}%`)
      .offset((pagina - 1) * limite)
      .limit(limite);
  }

  async findAlunoById(id) {
    const aluno = await knex("aluno").where("id", id).first();
    if (!aluno) throw new Error("Aluno não encontrado");
    return aluno;
  }

  async create(rga, nome, curso) {
    const trx = await knex.transaction();

    const aluno = await trx("aluno").insert({ rga, nome, curso });

    await trx.commit();

    return aluno;
  }

  async delete(id) {
    return knex("aluno").where("id", id).del();
  }

  async update(id, rgaUpdated, nomeUpdated, cursoUpdated, situacaoUpdated) {
    const aluno = await this.findAlunoById(id);

    let rga = rgaUpdated;
    let nome = nomeUpdated;
    let curso = cursoUpdated;
    let situacao = situacaoUpdated;

    if (!rgaUpdated) {
      rga = aluno.rga;
    }
    if (!nomeUpdated) {
      nome = aluno.nome;
    }
    if (!cursoUpdated) {
      curso = aluno.curso;
    }
    if (!situacaoUpdated) {
      situacao = aluno.situacao;
    }

    return knex("aluno").where("id", id).update({ rga, nome, curso, situacao });
  }
}

export default AlunoService;
