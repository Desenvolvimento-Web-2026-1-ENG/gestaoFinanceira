import { Tarefa } from '@entities/Tarefa';

export interface ITarefaRepository {
  listarTodas(): Tarefa[];
  buscarPorId(id: number): Tarefa | undefined;
  criar(tarefa: Omit<Tarefa, "id">): Tarefa;
  atualizar(id: number, dados: Partial<Tarefa>): Tarefa | undefined;
  excluir(id: number): boolean;
  buscarPorCategoria(categoriaId: number): Tarefa[]; // <-- Novo método
}
