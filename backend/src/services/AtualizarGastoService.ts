import { Gasto } from '@entities/Gasto';
import { IGastoRepository } from '@repositories/IGastoRepository';
import { AtualizarGastoDTO } from './dtos/GastoDTOs.js';

export class AtualizarGastoService {
  constructor(private gastoRepository: IGastoRepository) {}

  async atualizar(id: string, dados: AtualizarGastoDTO): Promise<Gasto> {
    if (!id || id.trim() === '') {
      const error = new Error('ID do gasto é obrigatório.');
      (error as any).status = 400;
      throw error;
    }

    const gastoExistente = await this.gastoRepository.buscarPorId(id);
    if (!gastoExistente) {
      const error = new Error('Gasto não encontrado para atualização.');
      (error as any).status = 404;
      throw error;
    }

    const erros: string[] = [];
    dados = dados || {};

    if (dados.descricao !== undefined) {
      if (typeof dados.descricao !== 'string' || dados.descricao.trim() === '') {
        erros.push("O campo 'descricao' não pode ser vazio.");
      }
    }

    if (dados.valor !== undefined) {
      if (typeof dados.valor !== 'number' || dados.valor <= 0) {
        erros.push("O campo 'valor' deve ser um número maior que zero.");
      }
    }

    if (dados.data !== undefined) {
      if (typeof dados.data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dados.data)) {
        erros.push("O campo 'data' deve estar no formato YYYY-MM-DD.");
      }
    }

    if (dados.categoria !== undefined) {
      if (typeof dados.categoria !== 'string' || dados.categoria.trim() === '') {
        erros.push("O campo 'categoria' não pode ser vazio.");
      }
    }

    if (dados.formaPagamento !== undefined) {
      if (typeof dados.formaPagamento !== 'string' || dados.formaPagamento.trim() === '') {
        erros.push("O campo 'formaPagamento' não pode ser vazio.");
      }
    }

    if (erros.length > 0) {
      const error = new Error('Dados inválidos');
      (error as any).status = 400;
      (error as any).detalhes = erros;
      throw error;
    }

    const dadosLimpos: Partial<Omit<Gasto, 'id' | 'criadoEm'>> = {};
    if (dados.descricao !== undefined) dadosLimpos.descricao = dados.descricao.trim();
    if (dados.valor !== undefined) dadosLimpos.valor = dados.valor;
    if (dados.data !== undefined) dadosLimpos.data = dados.data;
    if (dados.categoria !== undefined) dadosLimpos.categoria = dados.categoria.trim();
    if (dados.formaPagamento !== undefined) dadosLimpos.formaPagamento = dados.formaPagamento.trim();

    const gastoAtualizado = await this.gastoRepository.atualizar(id, dadosLimpos);
    if (!gastoAtualizado) {
      const error = new Error('Erro ao atualizar o gasto.');
      (error as any).status = 500;
      throw error;
    }

    return gastoAtualizado;
  }
}
