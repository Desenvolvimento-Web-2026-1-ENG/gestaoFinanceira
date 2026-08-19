export interface CriarTarefaDTO {
  titulo: string;
  descricao?: string;
  categoriaId?: number; // <-- Novo campo opcional para vincular a categoria na criação
}

export interface AtualizarTarefaDTO {
  titulo?: string;
  descricao?: string;
  concluida?: boolean;
  categoriaId?: number; // <-- Novo campo opcional para permitir trocar a categoria
}
