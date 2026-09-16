import { GastoController } from "@interfaces/controllers/GastoController.js";
import { RegistrarGastoService } from "@services/RegistrarGastoService.js";
import { ConsultarGastosService } from "@services/ConsultarGastosService.js";
import { AtualizarGastoService } from "@services/AtualizarGastoService.js";
import { ExcluirGastoService } from "@services/ExcluirGastoService.js";
import { DashboardService } from "@services/DashboardService.js";
import { GastoRepositoryPrisma } from "@infrastructure/database/prisma/GastoRepositoryPrisma.js";
// import { GastoRepositoryInMemory } from "@infrastructure/database/memory/GastoRepositoryInMemory.js";

export class GastoFactory {
  private static repository = new GastoRepositoryPrisma();

  static criarController(): GastoController {
    const repo = GastoFactory.repository;

    const registrarService = new RegistrarGastoService(repo);
    const consultarService = new ConsultarGastosService(repo);
    const atualizarService = new AtualizarGastoService(repo);
    const excluirService = new ExcluirGastoService(repo);
    const dashboardService = new DashboardService(repo);

    return new GastoController(
      registrarService,
      consultarService,
      atualizarService,
      excluirService,
      dashboardService
    );
  }
}

