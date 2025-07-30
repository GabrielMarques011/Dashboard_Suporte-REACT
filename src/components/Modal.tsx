import { createPortal } from 'react-dom';

// Tipo para dados de clientes (usado em Retenções e Upgrades)
type ClientItem = {
  name: string;
  value?: number; // Valor do contrato/upgrade
  date?: string;  // Data da retenção/upgrade
  status?: 'concluído' | 'em_andamento' | 'pendente';
};

// Tipo que corresponde ao seu App
type SolvedItem = {
  name: string;
  count: number;
};

type Stat = {
  title: string;
  value: number;
  trend: string;
  icon: 'check' | 'star' | 'arrow-up' | 'chat';
  type: 'success' | 'info' | 'warning';
  solvedItems?: SolvedItem[]; // Lista opcional para casos solucionados
  clientItems?: ClientItem[]; // Lista opcional para clientes (retenções/upgrades)
};

interface ModalProps {
  visible?: boolean;
  data: Stat;
  onClose: () => void;
}

export default function Modal({ visible = true, data, onClose }: ModalProps) {
  if (!visible) return null;

  // Função para obter o emoji do ícone
  const getIconEmoji = (icon: string) => {
    switch (icon) {
      case 'check': return '✅';
      case 'star': return '⭐';
      case 'arrow-up': return '📈';
      case 'chat': return '💬';
      default: return '📊';
    }
  };

  // Função para formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para obter cor do status
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'concluído': return { bg: '#dcfce7', color: '#166534' };
      case 'em_andamento': return { bg: '#fef3c7', color: '#92400e' };
      case 'pendente': return { bg: '#fee2e2', color: '#991b1b' };
      default: return { bg: '#e5e7eb', color: '#374151' };
    }
  };

  // Função para obter texto do status
  const getStatusText = (status?: string) => {
    switch (status) {
      case 'concluído': return 'Concluído';
      case 'em_andamento': return 'Em Andamento';
      case 'pendente': return 'Pendente';
      default: return 'N/A';
    }
  };

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)'
      }}
      role="dialog" 
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          maxWidth: '520px',
          width: '90%',
          maxHeight: '90vh',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header minimalista */}
        <div style={{
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          padding: '1.5rem 2rem',
          position: 'relative'
        }}>
          {/* Botão de fechar no header */}
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '36px',
              height: '36px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '400',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = '#e2e8f0';
              (e.target as HTMLButtonElement).style.color = '#475569';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = '#f1f5f9';
              (e.target as HTMLButtonElement).style.color = '#64748b';
            }}
          >
            ×
          </button>

          {/* Header com ícone e título */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: data.type === 'success' ? '#dcfce7' : 
                         data.type === 'warning' ? '#fef3c7' : '#dbeafe',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              {getIconEmoji(data.icon)}
            </div>
            
            <div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {data.title}
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: '2px 0 0 0'
              }}>
                Detalhes da métrica
              </p>
            </div>
          </div>
        </div>

        {/* Conteúdo do modal */}
        <div style={{ padding: '24px' }}>
          {/* Valor principal em destaque */}
          <div style={{
            textAlign: 'center',
            padding: '32px 24px',
            background: '#fafbfc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '8px'
            }}>
              Valor Atual
            </div>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#1e293b',
              lineHeight: '1',
              marginBottom: '4px'
            }}>
              {data.value.toLocaleString()}
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              borderRadius: '20px',
              background: data.type === 'success' ? '#dcfce7' : 
                         data.type === 'warning' ? '#fef3c7' : '#dbeafe',
              color: data.type === 'success' ? '#166534' : 
                     data.type === 'warning' ? '#92400e' : '#1e40af',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {data.type === 'success' ? 'Sucesso' :
               data.type === 'warning' ? 'Atenção' :
               data.type === 'info' ? 'Informação' : data.type}
            </div>
          </div>

          {/* Lista de itens solucionados (apenas para casos solucionados) */}
          {data.title === 'Casos Solucionados' && data.solvedItems && (
            <div style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
                background: '#f8fafc'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Problemas Solucionados
                </h3>
              </div>
              <div style={{ 
                padding: '8px 0',
                maxHeight: '175px',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}>
                {data.solvedItems.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 20px',
                    borderBottom: index < data.solvedItems!.length - 1 ? '1px solid #f1f5f9' : 'none',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#059669',
                        borderRadius: '50%'
                      }}></div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#1e293b'
                      }}>
                        {item.name}
                      </span>
                    </div>
                    <div style={{
                      background: '#dcfce7',
                      color: '#166534',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>
              
              {data.solvedItems.length > 6 && (
                <div style={{
                  padding: '8px 20px',
                  background: '#f8fafc',
                  borderTop: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#64748b',
                    fontStyle: 'italic'
                  }}>
                    Role para ver mais itens
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Lista de clientes (para Retenções e Upgrades) */}
          {(data.title === 'Retenções' || data.title === 'Upgrades') && data.clientItems && (
            <div style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
                background: '#f8fafc'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {data.title === 'Retenções' ? 'Clientes Retidos' : 'Clientes com Upgrade'}
                </h3>
              </div>
              <div style={{ 
                padding: '8px 0',
                maxHeight: '200px',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}>
                {data.clientItems.map((client, index) => (
                  <div key={index} style={{
                    padding: '16px 20px',
                    borderBottom: index < data.clientItems!.length - 1 ? '1px solid #f1f5f9' : 'none',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '4px'
                        }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            background: data.title === 'Retenções' ? '#3b82f6' : '#059669',
                            borderRadius: '50%'
                          }}></div>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1e293b'
                          }}>
                            {client.name}
                          </span>
                        </div>
                        
                        <div style={{
                          fontSize: '12px',
                          color: '#64748b',
                          marginLeft: '16px'
                        }}>
                          {client.date && `Data: ${client.date}`}
                          {client.value && (
                            <span style={{ marginLeft: client.date ? ' • ' : '' }}>
                              Valor: {formatCurrency(client.value)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {client.status && (
                        <div style={{
                          background: getStatusColor(client.status).bg,
                          color: getStatusColor(client.status).color,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          whiteSpace: 'nowrap'
                        }}>
                          {getStatusText(client.status)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* {data.clientItems.length > 5 && (
                <div style={{
                  padding: '8px 20px',
                  background: '#f8fafc',
                  borderTop: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#64748b',
                    fontStyle: 'italic'
                  }}>
                    Role para ver mais clientes
                  </span>
                </div>
              )} */}
            </div>
          )}

          {/* Informações detalhadas */}
          <div style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <div style={{
                flex: '1',
                padding: '20px',
                borderRight: '1px solid #e2e8f0'
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px'
                }}>
                  Tendência
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: data.trend.includes('+') || data.trend.includes('↑') ? '#059669' : 
                        data.trend.includes('-') || data.trend.includes('↓') ? '#dc2626' : '#1e293b'
                }}>
                  {data.trend}
                </div>
              </div>

              <div style={{
                flex: '1',
                padding: '20px'
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px'
                }}>
                  Categoria
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  {data.type === 'success' ? 'Sucesso' :
                   data.type === 'warning' ? 'Atenção' :
                   data.type === 'info' ? 'Informação' : data.type}
                </div>
              </div>
            </div>

            {/* Rodapé com ações */}
            <div style={{
              padding: '20px',
              background: '#fafbfc',
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={onClose}
                style={{
                  flex: '1',
                  background: '#3b82f6',
                  color: 'white',
                  fontWeight: '600',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#3b82f6';
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}