import { Gasto } from '@entities/Gasto';
import { IGastoRepository } from '@repositories/IGastoRepository';
import { CriarGastoDTO } from './dtos/GastoDTOs.js';
import { v4 as uuidv4 } from 'uuid';

export class RegistrarGastoService {
  constructor(private gastoRepository: IGastoRepository) {}

  async registrar(dados: CriarGastoDTO): Promise<Gasto> {
    const erros: string[] = [];

    // Validação dos campos obrigatórios
    if (!dados.descricao || dados.descricao.trim() === '') {
      erros.push("O campo 'descricao' é obrigatório.");
    }

    if (dados.valor === undefined || dados.valor === null || typeof dados.valor !== 'number' || dados.valor <= 0) {
      erros.push("O campo 'valor' deve ser maior que zero.");
    }

    if (!dados.data || dados.data.trim() === '') {
      erros.push("O campo 'data' é obrigatório.");
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dados.data)) {
      erros.push("O campo 'data' deve estar no formato YYYY-MM-DD.");
    } else {
      const dataObj = new Date(dados.data + 'T00:00:00');
      if (isNaN(dataObj.getTime())) {
        erros.push("O campo 'data' contém uma data inválida.");
      }
    }

    if (!dados.categoria || dados.categoria.trim() === '') {
      erros.push("O campo 'categoria' é obrigatório.");
    }

    if (!dados.formaPagamento || dados.formaPagamento.trim() === '') {
      erros.push("O campo 'formaPagamento' é obrigatório.");
    }

    if (!dados.tag || dados.tag.trim() === '') {
      erros.push("O campo 'tag' é obrigatório.");
    }

    if (erros.length > 0) {
      const error = new Error('Dados inválidos');
      (error as any).detalhes = erros;
      throw error;
    }

    const novoGasto: Gasto = {
      id: uuidv4(),
      descricao: dados.descricao.trim(),
      valor: dados.valor,
      data: dados.data,
      categoria: dados.categoria.trim(),
      formaPagamento: dados.formaPagamento.trim(),
      tag: dados.tag.trim(),
      criadoEm: new Date().toISOString(),
    };

    return await this.gastoRepository.criar(novoGasto);
  }
}
