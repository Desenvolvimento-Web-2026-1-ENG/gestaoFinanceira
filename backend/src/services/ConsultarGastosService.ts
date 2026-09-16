import { Gasto } from '@entities/Gasto';
import { IGastoRepository } from '@repositories/IGastoRepository';
import { FiltroGastosDTO } from './dtos/GastoDTOs.js';

export class ConsultarGastosService {
  constructor(private gastoRepository: IGastoRepository) {}

  async listar(filtros?: FiltroGastosDTO): Promise<Gasto[]> {
    return await this.gastoRepository.listar(filtros);
  }

  async buscarPorId(id: string): Promise<Gasto> {
    if (!id || id.trim() === '') {
      const error = new Error('ID do gasto é obrigatório.');
      (error as any).status = 400;
      throw error;
    }

    const gasto = await this.gastoRepository.buscarPorId(id);
    if (!gasto) {
      const error = new Error('Gasto não encontrado.');
      (error as any).status = 404;
      throw error;
    }

    return gasto;
  }

  async listarCategorias(): Promise<string[]> {
    return await this.gastoRepository.listarCategorias();
  }
}
