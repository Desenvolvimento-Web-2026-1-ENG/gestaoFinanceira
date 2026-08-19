import { Tarefa } from "@entities/Tarefa";
import { ITarefaRepository } from "@repositories/ITarefaRepository";

// Escopo global do módulo para simular um banco de dados único.
// Isso garante que a TarefaFactory e a CategoriaFactory enxerguem os mesmos dados.
let tarefas: Tarefa[] = [];
let proximoId = 1;

export class TarefaRepositoryInMemory implements ITarefaRepository {
  listarTodas(): Tarefa[] {
    return tarefas;
  }

  buscarPorId(id: number): Tarefa | undefined {
    return tarefas.find((t) => t.id === id);
  }

  // Novo método exigido pela regra de exclusão de Categorias
  buscarPorCategoria(categoriaId: number): Tarefa[] {
    return tarefas.filter((t) => t.categoriaId === categoriaId);
  }

  criar(dados: Omit<Tarefa, "id">): Tarefa {
    const novaTarefa: Tarefa = {
      id: proximoId++,
      ...dados,
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
  }

  atualizar(id: number, dados: Partial<Tarefa>): Tarefa | undefined {
    const index = tarefas.findIndex((t) => t.id === id);
    if (index === -1) return undefined;

    // Atualiza os dados, mas garante que o ID original não seja sobrescrito
    tarefas[index] = { ...tarefas[index], ...dados, id };
    return tarefas[index];
  }

  excluir(id: number): boolean {
    const tamanhoInicial = tarefas.length;
    tarefas = tarefas.filter((t) => t.id !== id);

    // Se o tamanho diminuiu, significa que algo foi excluído
    return tarefas.length < tamanhoInicial;
  }
}
