export interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  concluida: boolean;
  categoriaId?: number; // <-- Novo campo opcional
}
