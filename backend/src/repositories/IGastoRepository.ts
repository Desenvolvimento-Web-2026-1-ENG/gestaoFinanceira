import { Gasto } from '@entities/Gasto';

export interface FiltrosGasto {
  mes?: string | undefined;
  ano?: string | undefined;
  categoria?: string | undefined;
}

export interface IGastoRepository {
  criar(gasto: Gasto): Promise<Gasto>;
  listar(filtros?: FiltrosGasto): Promise<Gasto[]>;
  buscarPorId(id: string): Promise<Gasto | null>;
  atualizar(id: string, dados: Partial<Omit<Gasto, 'id' | 'criadoEm'>>): Promise<Gasto | null>;
  excluir(id: string): Promise<boolean>;
  listarCategorias(): Promise<string[]>;
}
