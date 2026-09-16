import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GastosList from './pages/GastosList';
import GastoForm from './pages/GastoForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="gastos" element={<GastosList />} />
          <Route path="gastos/novo" element={<GastoForm />} />
          <Route path="gastos/:id/editar" element={<GastoForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
