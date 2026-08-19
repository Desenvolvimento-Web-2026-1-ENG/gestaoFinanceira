import { Tarefa } from '@entities/Tarefa.js';
import { ITarefaRepository } from '@repositories/ITarefaRepository.js';
import { ICategoriaRepository } from '@repositories/ICategoriaRepository.js';
import { CriarTarefaDTO, AtualizarTarefaDTO } from './dtos/TarefaDTOs.js';

export class TarefaService {
  constructor(
    private tarefaRepository: ITarefaRepository,
    private categoriaRepository: ICategoriaRepository, // <-- Injetado
  ) {}

  listarTodas(): Tarefa[] {
    return this.tarefaRepository.listarTodas();
  }

  buscarPorId(id: number): Tarefa | undefined {
    return this.tarefaRepository.buscarPorId(id);
  }

  criar(dados: CriarTarefaDTO): Tarefa {
        // Validação da regra de negócio: a categoria informada existe?
        if (dados.categoriaId !== undefined && dados.categoriaId !== null) {
            const categoria = this.categoriaRepository.buscarPorId(dados.categoriaId);
            if (!categoria) {
                throw new Error('A categoria informada não existe.');
            }
        }

        return this.tarefaRepository.criar({
            titulo: dados.titulo,
            descricao: dados.descricao,
            concluida: false,
            categoriaId: dados.categoriaId
        });
    }

  atualizar(
    id: number,
    dadosAtualizados: AtualizarTarefaDTO,
  ): Tarefa | undefined {
    return this.tarefaRepository.atualizar(id, dadosAtualizados);
  }

  excluir(id: number): boolean {
    return this.tarefaRepository.excluir(id);
  }
}
