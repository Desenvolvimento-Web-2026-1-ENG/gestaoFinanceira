import { Request, Response } from 'express';
import { TarefaService } from '@services/TarefaService';
import { CriarTarefaDTO, AtualizarTarefaDTO } from '@services/dtos/TarefaDTOs';

export class TarefaController {
    constructor(private tarefaService: TarefaService) {}

    listar(req: Request, res: Response): void {
        const tarefas = this.tarefaService.listarTodas();
        res.json(tarefas);
    }

    buscar(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const tarefa = this.tarefaService.buscarPorId(id);

        if (!tarefa) {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
            return;
        }
        res.json(tarefa);
    }

    criar(req: Request, res: Response): void {
        const dados: CriarTarefaDTO = req.body;
        
        if (!dados.titulo) {
            res.status(400).json({ erro: 'O título é obrigatório' });
            return;
        }

        try {
            // Tenta criar a tarefa chamando o Service
            const novaTarefa = this.tarefaService.criar(dados);
            res.status(201).json(novaTarefa);
        } catch (error: any) {
            // Captura erros de regras de negócio (ex: "A categoria informada não existe")
            res.status(400).json({ erro: error.message });
        }
    }

    atualizar(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const dadosAtualizados: AtualizarTarefaDTO = req.body;
        
        try {
            const tarefaAtualizada = this.tarefaService.atualizar(id, dadosAtualizados);

            if (!tarefaAtualizada) {
                res.status(404).json({ erro: 'Tarefa não encontrada para atualização' });
                return;
            }
            res.json(tarefaAtualizada);
        } catch (error: any) {
             // Caso os alunos adicionem validação de categoria na atualização também
            res.status(400).json({ erro: error.message });
        }
    }

    excluir(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const excluiu = this.tarefaService.excluir(id);

        if (!excluiu) {
            res.status(404).json({ erro: 'Tarefa não encontrada para exclusão' });
            return;
        }
        res.status(204).send();
    }
}