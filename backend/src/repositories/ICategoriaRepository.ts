import { Categoria } from "@entities/Categoria";

export interface ICategoriaRepository {
  listarTodas(): Categoria[];
  buscarPorId(id: number): Categoria | undefined;
  buscarPorNome(nome: string): Categoria | undefined; // Necessário para a regra de negócio
  criar(dados: Omit<Categoria, "id">): Categoria;
  excluir(id: number): boolean;
}
