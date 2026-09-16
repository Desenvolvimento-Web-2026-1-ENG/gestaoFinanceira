import { apiFetch } from './api';

export const GastoService = {
  listarGastos: async (filtros = {}) => {
    const params = new URLSearchParams();
    if (filtros.mes) params.append('mes', filtros.mes);
    if (filtros.ano) params.append('ano', filtros.ano);
    if (filtros.categoria) params.append('categoria', filtros.categoria);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`/gastos${query}`);
  },

  buscarGastoPorId: async (id) => {
    return apiFetch(`/gastos/${id}`);
  },

  criarGasto: async (dados) => {
    return apiFetch('/gastos', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  atualizarGasto: async (id, dados) => {
    return apiFetch(`/gastos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  excluirGasto: async (id) => {
    return apiFetch(`/gastos/${id}`, {
      method: 'DELETE',
    });
  },

  listarCategorias: async () => {
    return apiFetch('/categorias');
  },

  obterDashboard: async (filtros = {}) => {
    const params = new URLSearchParams();
    if (filtros.mes) params.append('mes', filtros.mes);
    if (filtros.ano) params.append('ano', filtros.ano);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`/dashboard/resumo${query}`);
  }
};
