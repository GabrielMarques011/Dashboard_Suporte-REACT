import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Lógica de autenticação: Substitua por sua lógica real (chamada de API, etc.)
    if (user === 'marques' && senha === '123456') {
      onLogin(); // Chama a função onLogin passada via props se a autenticação for bem-sucedida
    } else {
      setErro('Usuario ou senha inválidos'); // Exibe mensagem de erro
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      width: '100vw'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Card de login */}
        <div style={{
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}>
          {/* Header com gradiente azul */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
            padding: '2.5rem 2rem',
            textAlign: 'center'
          }}>
            {/* Logo/Ícone */}
            <div style={{
              width: '64px',
              height: '64px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                width: '45px',
                height: '45px',
                background: 'white',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  color: 'var(--primary-color)',
                  fontWeight: '700',
                  fontSize: '18px'
                }}>SUP</span>
              </div>
            </div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '0.5rem'
            }}>Dashboard Sup</h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px'
            }}>Acesse sua conta para continuar!</p>
          </div>

          {/* Formulário */}
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Campo E-mail */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  User
                </label>
                <input
                  type="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  placeholder="Digite o seu usuario"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = 'var(--primary-color)';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Campo Senha */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = 'var(--primary-color)';
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
                    (e.target as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Mensagem de erro */}
              {erro && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem'
                }}>
                  <p style={{
                    color: 'var(--error-color)',
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: 0
                  }}>{erro}</p>
                </div>
              )}

              {/* Botão de login */}
              <button
                type="button"
                onClick={handleLogin}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.target as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                Entrar no Dashboard
              </button>

              {/* Link "Esqueci minha senha" */}
              <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
                <a href="#" style={{
                  color: 'var(--text-muted)',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = 'var(--primary-color)'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'var(--text-muted)'}
                >
                  Esqueci minha senha
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#737373ff',
          fontSize: '12px'
        }}>
          <p>Sistema feito por @GabrielMarques011</p>
        </div>
      </div>
    </div>
  );
}