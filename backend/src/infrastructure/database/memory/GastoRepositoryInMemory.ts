import { Gasto } from "@entities/Gasto";
import { FiltrosGasto, IGastoRepository } from "@repositories/IGastoRepository";

const CATEGORIAS_PADRAO = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Outros"
];

// Escopo global do módulo para simular um banco de dados em memória com dados iniciais para testes
const gastos: Gasto[] = [
  {
    id: "d1a8c456-7890-4abc-def1-1234567890ab",
    descricao: "Compras do Mês - Supermercado",
    valor: 450.75,
    data: "2026-08-10",
    categoria: "Alimentação",
    formaPagamento: "Cartão de Crédito",
    criadoEm: "2026-08-10T14:30:00.000Z",
  },
  {
    id: "e2b9d567-8901-4bcd-ef12-2345678901bc",
    descricao: "Combustível Posto Shell",
    valor: 180.00,
    data: "2026-08-15",
    categoria: "Transporte",
    formaPagamento: "Cartão de Débito",
    criadoEm: "2026-08-15T09:15:00.000Z",
  },
  {
    id: "f3cae678-9012-4cde-f123-3456789012cd",
    descricao: "Assinatura Streaming",
    valor: 55.90,
    data: "2026-08-20",
    categoria: "Lazer",
    formaPagamento: "PIX",
    criadoEm: "2026-08-20T18:00:00.000Z",
  }
];

export class GastoRepositoryInMemory implements IGastoRepository {
  async criar(gasto: Gasto): Promise<Gasto> {
    gastos.push(gasto);
    return gasto;
  }

  async listar(filtros?: FiltrosGasto): Promise<Gasto[]> {
    let resultado = [...gastos];

    if (filtros) {
      if (filtros.categoria) {
        const catBusca = filtros.categoria.toLowerCase();
        resultado = resultado.filter(g => g.categoria.toLowerCase() === catBusca);
      }

      if (filtros.mes) {
        const mesFiltro = filtros.mes.padStart(2, '0');
        resultado = resultado.filter(g => {
          const [, mes] = g.data.split('-');
          return mes === mesFiltro;
        });
      }

      if (filtros.ano) {
        resultado = resultado.filter(g => {
          const [ano] = g.data.split('-');
          return ano === filtros.ano;
        });
      }
    }

    return resultado;
  }

  async buscarPorId(id: string): Promise<Gasto | null> {
    const gasto = gastos.find(g => g.id === id);
    return gasto || null;
  }

  async atualizar(id: string, dados: Partial<Omit<Gasto, 'id' | 'criadoEm'>>): Promise<Gasto | null> {
    const index = gastos.findIndex(g => g.id === id);
    if (index === -1) return null;

    const gastoAtual = gastos[index];
    if (!gastoAtual) return null;

    const gastoAtualizado: Gasto = {
      id: gastoAtual.id,
      criadoEm: gastoAtual.criadoEm,
      descricao: dados.descricao !== undefined ? dados.descricao : gastoAtual.descricao,
      valor: dados.valor !== undefined ? dados.valor : gastoAtual.valor,
      data: dados.data !== undefined ? dados.data : gastoAtual.data,
      categoria: dados.categoria !== undefined ? dados.categoria : gastoAtual.categoria,
      formaPagamento: dados.formaPagamento !== undefined ? dados.formaPagamento : gastoAtual.formaPagamento,
    };

    gastos[index] = gastoAtualizado;
    return gastoAtualizado;
  }

  async excluir(id: string): Promise<boolean> {
    const index = gastos.findIndex(g => g.id === id);
    if (index === -1) return false;

    gastos.splice(index, 1);
    return true;
  }

  async listarCategorias(): Promise<string[]> {
    return CATEGORIAS_PADRAO;
  }
}

