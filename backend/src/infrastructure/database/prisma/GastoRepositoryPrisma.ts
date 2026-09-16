import { Gasto } from '@entities/Gasto';
import { FiltrosGasto, IGastoRepository } from '@repositories/IGastoRepository';
import { prisma } from './PrismaClient.js';

export class GastoRepositoryPrisma implements IGastoRepository {
  async criar(gasto: Gasto): Promise<Gasto> {
    const novo = await prisma.gasto.create({
      data: {
        id: gasto.id,
        descricao: gasto.descricao,
        valor: gasto.valor,
        data: gasto.data,
        categoria: gasto.categoria,
        formaPagamento: gasto.formaPagamento,
        tag: gasto.tag,
        criadoEm: new Date(gasto.criadoEm),
      },
    });

    return {
      ...novo,
      criadoEm: novo.criadoEm.toISOString(),
    };
  }

  async listar(filtros?: FiltrosGasto): Promise<Gasto[]> {
    const where: any = {};

    if (filtros?.categoria) {
      where.categoria = filtros.categoria;
    }

    if (filtros?.mes || filtros?.ano) {
      // Como a data é string no formato YYYY-MM-DD
      where.data = {
        startsWith: `${filtros.ano || ''}-${filtros.mes ? filtros.mes.padStart(2, '0') : ''}`.replace(/^-|-$/, ''),
      };
    }

    const gastos = await prisma.gasto.findMany({ where });

    return gastos.map((g: any) => ({
      ...g,
      criadoEm: g.criadoEm.toISOString(),
    }));
  }

  async buscarPorId(id: string): Promise<Gasto | null> {
    const gasto = await prisma.gasto.findUnique({ where: { id } });
    if (!gasto) return null;
    return {
      ...gasto,
      criadoEm: gasto.criadoEm.toISOString(),
    };
  }

  async atualizar(id: string, dados: Partial<Omit<Gasto, 'id' | 'criadoEm'>>): Promise<Gasto | null> {
    try {
      const atualizado = await prisma.gasto.update({
        where: { id },
        data: {
          ...(dados.descricao !== undefined && { descricao: dados.descricao }),
          ...(dados.valor !== undefined && { valor: dados.valor }),
          ...(dados.data !== undefined && { data: dados.data }),
          ...(dados.categoria !== undefined && { categoria: dados.categoria }),
          ...(dados.formaPagamento !== undefined && { formaPagamento: dados.formaPagamento }),
          ...(dados.tag !== undefined && { tag: dados.tag }),
        },
      });

      return {
        ...atualizado,
        criadoEm: atualizado.criadoEm.toISOString(),
      };
    } catch (error) {
      // Caso não encontre, o Prisma lança erro. Retornamos null.
      return null;
    }
  }

  async excluir(id: string): Promise<boolean> {
    try {
      await prisma.gasto.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }

  async listarCategorias(): Promise<string[]> {
    // Busca categorias únicas baseadas nos gastos cadastrados (como não há tabela separada)
    const categorias = await prisma.gasto.findMany({
      select: { categoria: true },
      distinct: ['categoria'],
    });

    const categoriesList = categorias.map((c: any) => c.categoria);
    
    // Categorias padrão caso o BD esteja vazio ou falte alguma
    const defaultCategories = [
      "Alimentação", "Transporte", "Moradia", 
      "Lazer", "Saúde", "Educação", "Outros"
    ];

    const allCategories = new Set([...defaultCategories, ...categoriesList]);
    return Array.from(allCategories);
  }
}
