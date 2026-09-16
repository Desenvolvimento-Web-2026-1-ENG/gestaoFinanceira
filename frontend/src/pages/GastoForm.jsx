import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { GastoService } from '../services/gastoService';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'];
const FORMAS_PAGAMENTO = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Boleto'];

const GastoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    categoria: CATEGORIAS[0],
    formaPagamento: FORMAS_PAGAMENTO[3], // Default PIX
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      carregarGasto();
    }
  }, [id]);

  const carregarGasto = async () => {
    try {
      const gasto = await GastoService.buscarGastoPorId(id);
      setFormData({
        descricao: gasto.descricao,
        valor: gasto.valor,
        data: gasto.data,
        categoria: gasto.categoria,
        formaPagamento: gasto.formaPagamento,
      });
    } catch (err) {
      setError('Gasto não encontrado.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor' ? Number(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      if (isEditing) {
        await GastoService.atualizarGasto(id, formData);
      } else {
        await GastoService.criarGasto(formData);
      }
      navigate('/gastos');
    } catch (err) {
      console.error(err);
      if (err.data && err.data.detalhes) {
        setError(err.data.detalhes.join(' '));
      } else {
        setError('Ocorreu um erro ao salvar o gasto.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-fade-in"><p>Carregando dados do gasto...</p></div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">{isEditing ? 'Editar Gasto' : 'Novo Gasto'}</h1>
        <Link to="/gastos" className="btn btn-outline">
          <ArrowLeft size={18} />
          Voltar
        </Link>
      </div>

      {error && (
        <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', borderColor: 'var(--danger)', backgroundColor: '#fee2e2', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            className="form-input"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Ex: Almoço restaurante"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="valor">Valor (R$)</label>
            <input
              type="number"
              id="valor"
              name="valor"
              className="form-input"
              value={formData.valor}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="data">Data</label>
            <input
              type="date"
              id="data"
              name="data"
              className="form-input"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              name="categoria"
              className="form-select"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              {CATEGORIAS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="formaPagamento">Forma de Pagamento</label>
            <select
              id="formaPagamento"
              name="formaPagamento"
              className="form-select"
              value={formData.formaPagamento}
              onChange={handleChange}
              required
            >
              {FORMAS_PAGAMENTO.map(forma => (
                <option key={forma} value={forma}>{forma}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Link to="/gastos" className="btn btn-outline" type="button">Cancelar</Link>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={18} />
            {saving ? 'Salvando...' : 'Salvar Gasto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GastoForm;
