import { useState, useEffect } from 'react';
import { GastoService } from '../services/gastoService';
import { TrendingDown, PieChart, Activity, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarDashboard();
  }, []);

  const carregarDashboard = async () => {
    try {
      setLoading(true);
      const data = await GastoService.obterDashboard();
      setResumo(data);
      setError(null);
    } catch (err) {
      setError('Não foi possível carregar os dados do dashboard.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="animate-fade-in"><p>Carregando dashboard...</p></div>;
  if (error) return (
    <div className="card" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--danger)' }}>
      <AlertCircle size={48} style={{ color: 'var(--danger)', margin: '0 auto 1rem' }} />
      <h3 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</h3>
      <button className="btn btn-outline" onClick={carregarDashboard}>Tentar novamente</button>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Resumo Financeiro</h1>
        <div className="badge" style={{ backgroundColor: '#e0e7ff', color: 'var(--primary)', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          Mês Atual ({resumo?.mes}/{resumo?.ano})
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fee2e2', color: 'var(--danger)' }}>
            <TrendingDown size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Gasto</h3>
            <p>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo?.totalGasto || 0)}
            </p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>Lançamentos</h3>
            <p>{resumo?.quantidadeGastos || 0}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
            <PieChart size={20} className="text-primary" />
            Gastos por Categoria
          </h3>
          
          {Object.keys(resumo?.totalPorCategoria || {}).length === 0 ? (
             <p className="text-muted">Nenhum gasto registrado neste mês.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(resumo.totalPorCategoria)
                .sort(([, a], [, b]) => b - a)
                .map(([categoria, valor]) => (
                <div key={categoria} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontWeight: 500 }}>{categoria}</span>
                  <span style={{ fontWeight: 700 }}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
            <TrendingDown size={20} style={{ color: 'var(--danger)' }} />
            Maiores Gastos
          </h3>
          
          {resumo?.maioresGastos && resumo.maioresGastos.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {resumo.maioresGastos.map((gasto) => (
                <div key={gasto.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{gasto.descricao}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{gasto.categoria}</div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--danger)' }}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gasto.valor)}
                  </span>
                </div>
              ))}
              <Link to="/gastos" style={{ textAlign: 'center', color: 'var(--primary)', fontWeight: 500, fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>
                Ver todos os gastos &rarr;
              </Link>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>Nenhum gasto registrado neste mês.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
