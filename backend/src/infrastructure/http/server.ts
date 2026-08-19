import express from 'express';

import tarefasRoutes from './routes/tarefas.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import docsRoutes from './routes/docs.routes'; // <-- Novo roteador

const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}/api/v1`;

app.use(express.json());
app.use('/api/v1', tarefasRoutes);
app.use('/api/v1', categoriasRoutes); // <-- Adicionando o roteador de categorias

// Rotas de documentação isoladas
app.use('/api-docs', docsRoutes);

app.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando na porta ${PORT}`);
  console.log(
    `📄 Documentação interativa em: http://localhost:${PORT}/api-docs`,
  );
  console.log(
    `📥 Download do JSON (Postman) em: http://localhost:${PORT}/api-docs/json`,
  );
  console.log(`🌐 Teste as Tarefas em: ${BASE_URL}/tarefas`);
  console.log(`🌐 Teste as Categorias em: ${BASE_URL}/categorias`);
});