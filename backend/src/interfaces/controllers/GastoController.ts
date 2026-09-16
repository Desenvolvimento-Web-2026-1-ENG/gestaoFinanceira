import { Request, Response } from 'express';
import { RegistrarGastoService } from '@services/RegistrarGastoService';
import { ConsultarGastosService } from '@services/ConsultarGastosService';
import { AtualizarGastoService } from '@services/AtualizarGastoService';
import { ExcluirGastoService } from '@services/ExcluirGastoService';
import { DashboardService } from '@services/DashboardService';
import { CriarGastoDTO, AtualizarGastoDTO, FiltroGastosDTO } from '@services/dtos/GastoDTOs';

export class GastoController {
  constructor(
    private registrarGastoService: RegistrarGastoService,
    private consultarGastosService: ConsultarGastosService,
    private atualizarGastoService: AtualizarGastoService,
    private excluirGastoService: ExcluirGastoService,
    private dashboardService: DashboardService
  ) {}

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const dados: CriarGastoDTO = req.body;
      const novoGasto = await this.registrarGastoService.registrar(dados);
      res.status(201).json(novoGasto);
    } catch (error: any) {
      if (error.message === 'Dados inválidos') {
        res.status(400).json({
          erro: error.message,
          detalhes: error.detalhes || [],
        });
        return;
      }
      res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const filtros: FiltroGastosDTO = {
        mes: req.query.mes as string | undefined,
        ano: req.query.ano as string | undefined,
        categoria: req.query.categoria as string | undefined,
      };
      const gastos = await this.consultarGastosService.listar(filtros);
      res.status(200).json(gastos);
    } catch (error: any) {
      res.status(500).json({ erro: 'Erro interno do servidor ao listar gastos.' });
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id || '');
      const gasto = await this.consultarGastosService.buscarPorId(id);
      res.status(200).json(gasto);
    } catch (error: any) {
      const status = error.status || 500;
      res.status(status).json({ erro: error.message });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id || '');
      const dados: AtualizarGastoDTO = req.body;
      const gastoAtualizado = await this.atualizarGastoService.atualizar(id, dados);
      res.status(200).json(gastoAtualizado);
    } catch (error: any) {
      const status = error.status || 500;
      res.status(status).json({
        erro: error.message,
        detalhes: error.detalhes || undefined,
      });
    }
  }

  async excluir(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id || '');
      await this.excluirGastoService.excluir(id);
      res.status(200).json({ mensagem: 'Gasto excluído com sucesso.' });
    } catch (error: any) {
      const status = error.status || 500;
      res.status(status).json({ erro: error.message });
    }
  }

  async listarCategorias(req: Request, res: Response): Promise<void> {
    try {
      const categorias = await this.consultarGastosService.listarCategorias();
      res.status(200).json(categorias);
    } catch (error: any) {
      res.status(500).json({ erro: 'Erro interno ao listar categorias.' });
    }
  }

  async obterDashboard(req: Request, res: Response): Promise<void> {
    try {
      const mes = req.query.mes as string | undefined;
      const ano = req.query.ano as string | undefined;
      const resumo = await this.dashboardService.obterResumo(mes, ano);
      res.status(200).json(resumo);
    } catch (error: any) {
      res.status(500).json({ erro: 'Erro interno ao obter resumo do dashboard.' });
    }
  }
}

