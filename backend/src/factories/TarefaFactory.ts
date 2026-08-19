import { TarefaController } from "@interfaces/controllers/TarefaController";
import { TarefaService } from "@services/TarefaService";
import { TarefaRepositoryInMemory } from "@infrastructure/database/TarefaRepositoryInMemory";
import { CategoriaRepositoryInMemory } from "@infrastructure/database/CategoriaRepositoryInMemory";

export class TarefaFactory {
  static criarController(): TarefaController {
    // 1. Instanciamos os dois repositórios
    const tarefaRepo = new TarefaRepositoryInMemory();
    const categoriaRepo = new CategoriaRepositoryInMemory(); // <-- Nova dependência

    // 2. Injetamos AMBOS no Service (A ordem dos parâmetros importa!)
    const service = new TarefaService(tarefaRepo, categoriaRepo);

    // 3. Devolvemos o Controller pronto
    return new TarefaController(service);
  }
}
