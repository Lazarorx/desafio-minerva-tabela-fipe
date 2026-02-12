import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Login({ onSwitchToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <svg width="60" height="60" viewBox="0 0 50 50" fill="none">
            <rect width="50" height="50" rx="12" fill="#667eea"/>
            <path d="M15 20h20M15 25h15M15 30h20M15 35h12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="35" cy="32" r="8" fill="#2ecc71"/>
            <path d="M32 32l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>FipeCheck V2</h1>
          <p>Sistema Avançado de Consulta</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Entrar</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="auth-footer">
            <p>
              Não tem uma conta?{' '}
              <button type="button" onClick={onSwitchToRegister} className="link-button">
                Cadastre-se
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
