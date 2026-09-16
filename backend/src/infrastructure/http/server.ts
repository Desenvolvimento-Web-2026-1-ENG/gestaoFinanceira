import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import gastosRoutes from './routes/gastos.routes.js';
import { swaggerDocument } from './docs/swagger.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(express.json());

// Rota da documentação interativa Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da API REST
app.use('/api/v1', gastosRoutes);

// Rota raiz para conferência rápida
app.get('/', (req, res) => {
  res.json({
    projeto: 'FinContas — Gestão Financeira Pessoal',
    status: 'online',
    versao: '1.0.0-p1',
    documentacao: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      gastos: `http://localhost:${PORT}/api/v1/gastos`,
      categorias: `http://localhost:${PORT}/api/v1/categorias`,
      dashboard: `http://localhost:${PORT}/api/v1/dashboard/resumo`
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ Servidor FinContas rodando na porta ${PORT}`);
  console.log(`📄 Documentação Swagger interativa: http://localhost:${PORT}/api-docs`);
  console.log(`🌐 Teste os Gastos em: http://localhost:${PORT}/api/v1/gastos`);
});