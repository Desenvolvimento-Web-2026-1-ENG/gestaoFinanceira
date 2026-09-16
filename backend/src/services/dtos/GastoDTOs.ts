export interface CriarGastoDTO {
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  formaPagamento: string;
  tag: string;
}

export interface AtualizarGastoDTO {
  descricao?: string | undefined;
  valor?: number | undefined;
  data?: string | undefined;
  categoria?: string | undefined;
  formaPagamento?: string | undefined;
  tag?: string | undefined;
}

export interface FiltroGastosDTO {
  mes?: string | undefined;
  ano?: string | undefined;
  categoria?: string | undefined;
}

export interface DashboardResumoDTO {
  mes: string;
  ano: string;
  totalGasto: number;
  totalPorCategoria: Record<string, number>;
  quantidadeGastos: number;
  maioresGastos: {
    id: string;
    descricao: string;
    valor: number;
    categoria: string;
    data: string;
  }[];
}

