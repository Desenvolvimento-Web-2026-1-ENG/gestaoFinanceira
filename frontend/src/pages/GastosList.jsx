import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GastoService } from '../services/gastoService';
import { Edit2, Trash2, AlertCircle, PlusCircle, Receipt } from 'lucide-react';

const GastosList = () => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarGastos();
  }, []);

  const carregarGastos = async () => {
    try {
      setLoading(true);
      const data = await GastoService.listarGastos();
      setGastos(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar a lista de gastos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async (id, descricao) => {
    if (window.confirm(`Tem certeza que deseja excluir o gasto "${descricao}"?`)) {
      try {
        await GastoService.excluirGasto(id);
        setGastos(gastos.filter(g => g.id !== id));
      } catch (err) {
        alert('Erro ao excluir o gasto.');
        console.error(err);
      }
    }
  };

  const formatarData = (dataStr) => {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  if (loading) return <div className="animate-fade-in"><p>Carregando gastos...</p></div>;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Meus Gastos</h1>
        <Link to="/gastos/novo" className="btn btn-primary">
          <PlusCircle size={18} />
          Registrar Gasto
        </Link>
      </div>

      {error && (
        <div className="card" style={{ padding: '1rem', marginBottom: '1rem', borderColor: 'var(--danger)', backgroundColor: '#fee2e2', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="card table-container">
        {gastos.length === 0 ? (
          <div className="empty-state">
            <Receipt size={48} className="empty-state-icon" />
            <h3>Nenhum gasto registrado</h3>
            <p>Você ainda não cadastrou nenhuma despesa.</p>
            <Link to="/gastos/novo" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Registrar meu primeiro gasto
            </Link>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Forma de Pag.</th>
                <th style={{ textAlign: 'right' }}>Valor</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((gasto) => (
                <tr key={gasto.id}>
                  <td>{formatarData(gasto.data)}</td>
                  <td style={{ fontWeight: 500 }}>{gasto.descricao}</td>
                  <td><span className="badge" style={{ backgroundColor: '#e2e8f0', color: '#475569' }}>{gasto.categoria}</span></td>
                  <td>{gasto.formaPagamento}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--danger)' }}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gasto.valor)}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link to={`/gastos/${gasto.id}/editar`} className="action-btn" title="Editar">
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => handleExcluir(gasto.id, gasto.descricao)} className="action-btn delete" title="Excluir">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GastosList;
