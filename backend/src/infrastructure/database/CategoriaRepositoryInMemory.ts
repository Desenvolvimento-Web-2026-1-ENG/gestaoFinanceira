import { Categoria } from "@entities/Categoria";
import { ICategoriaRepository } from "@repositories/ICategoriaRepository";

// Escopo global do módulo para simular um banco único
let categorias: Categoria[] = [];
let proximoId = 1;

export class CategoriaRepositoryInMemory implements ICategoriaRepository {
  listarTodas(): Categoria[] {
    return categorias;
  }

  buscarPorId(id: number): Categoria | undefined {
    return categorias.find((c) => c.id === id);
  }

  buscarPorNome(nome: string): Categoria | undefined {
    return categorias.find((c) => c.nome.toLowerCase() === nome.toLowerCase());
  }

  criar(dados: Omit<Categoria, "id">): Categoria {
    const nova = { id: proximoId++, ...dados };
    categorias.push(nova);
    return nova;
  }

  excluir(id: number): boolean {
    const tamanho = categorias.length;
    categorias = categorias.filter((c) => c.id !== id);
    return categorias.length < tamanho;
  }
}
