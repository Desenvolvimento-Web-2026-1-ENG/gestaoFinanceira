import { IGastoRepository } from '@repositories/IGastoRepository';
import { DashboardResumoDTO } from './dtos/GastoDTOs.js';

export class DashboardService {
  constructor(private gastoRepository: IGastoRepository) {}

  async obterResumo(mesParam?: string, anoParam?: string): Promise<DashboardResumoDTO> {
    const hoje = new Date();
    const ano = anoParam || hoje.getFullYear().toString();
    const mes = mesParam ? mesParam.padStart(2, '0') : (hoje.getMonth() + 1).toString().padStart(2, '0');

    const todosGastos = await this.gastoRepository.listar({ mes, ano });

    let totalGasto = 0;
    const totalPorCategoria: Record<string, number> = {};

    for (const g of todosGastos) {
      totalGasto += g.valor;
      totalPorCategoria[g.categoria] = (totalPorCategoria[g.categoria] || 0) + g.valor;
    }

    // Ordena os maiores gastos em ordem decrescente de valor
    const maioresGastos = [...todosGastos]
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5)
      .map(g => ({
        id: g.id,
        descricao: g.descricao,
        valor: g.valor,
        categoria: g.categoria,
        data: g.data,
      }));

    return {
      mes,
      ano,
      totalGasto: Number(totalGasto.toFixed(2)),
      totalPorCategoria,
      quantidadeGastos: todosGastos.length,
      maioresGastos,
    };
  }
}
