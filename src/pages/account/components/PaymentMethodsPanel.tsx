import React, { useEffect, useState } from 'react';
import './account-tabs-style.css';

interface PaymentMethod {
  id: string;
  type: 'PIX' | 'CARTÃO' | 'CONTA BANCÁRIA';
  label: string;
  data: Record<string, string>;
}

interface PaymentMethodsPanelProps {
  userType: string;
}

const PaymentMethodsPanel: React.FC<PaymentMethodsPanelProps> = ({ userType }) => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<'PIX' | 'CARTÃO' | 'CONTA BANCÁRIA' | ''>('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // carregar métodos salvos localmente
  useEffect(() => {
    const saved = localStorage.getItem('paymentMethods');
    if (saved) setMethods(JSON.parse(saved));
  }, []);

  // salvar métodos localmente
  useEffect(() => {
    localStorage.setItem('paymentMethods', JSON.stringify(methods));
  }, [methods]);

  const handleAdd = () => {
    setShowForm(true);
    setSelectedType('');
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newMethod: PaymentMethod = {
        id: String(Date.now()),
        type: selectedType as any,
        label:
          selectedType === 'PIX'
            ? `${formData.chavePix}`
            : selectedType === 'CARTÃO'
              ? `${formData.bandeira} •••• ${formData.numeroCartao?.slice(-4)}`
              : `${formData.banco} - Ag ${formData.agencia} / CC ${formData.conta}`,
        data: formData,
      };

      setMethods([...methods, newMethod]);
      setShowForm(false);
      setIsLoading(false);
    }, 800); // simula processamento
  };

  const handleRemove = (id: string) => {
    setMethods(methods.filter((m) => m.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const renderFormFields = () => {
    switch (selectedType) {
      case 'PIX':
        return (
          <>
            <label htmlFor="chavePix">Chave Pix</label>
            <input id="chavePix" onChange={handleChange} placeholder="email, telefone ou CPF" />
          </>
        );
      case 'CARTÃO':
        return (
          <>
            <label htmlFor="bandeira">Bandeira</label>
            <select id="bandeira" onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Elo">Elo</option>
            </select>

            <label htmlFor="numeroCartao">Número do Cartão</label>
            <input id="numeroCartao" maxLength={16} placeholder="**** **** **** ****" onChange={handleChange} />

            <label htmlFor="validade">Validade</label>
            <input id="validade" placeholder="MM/AA" onChange={handleChange} />

            <label htmlFor="nomeTitular">Nome do Titular</label>
            <input id="nomeTitular" onChange={handleChange} />
          </>
        );
      case 'CONTA BANCÁRIA':
        return (
          <>
            <label htmlFor="banco">Banco</label>
            <input id="banco" onChange={handleChange} />

            <label htmlFor="agencia">Agência</label>
            <input id="agencia" onChange={handleChange} />

            <label htmlFor="conta">Conta</label>
            <input id="conta" onChange={handleChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="panel">
      <h3>
        {userType === 'prestador' ? 'Métodos de Recebimento' : 'Métodos de Pagamento'}
      </h3>

      <p>
        {userType === 'prestador'
          ? 'Cadastre formas de receber pagamentos por seus serviços.'
          : 'Adicione métodos de pagamento para contratar prestadores.'}
      </p>

      {/* Lista de métodos existentes */}
      <div className="payment-list">
        {methods.length === 0 ? (
          <p>Nenhum método cadastrado.</p>
        ) : (
          methods.map((m) => (
            <div key={m.id} className="payment-item">
              <span>
                <strong>{m.type}</strong> — {m.label}
              </span>
              <button className="btn payment-remove" onClick={() => handleRemove(m.id)}>
                Remover
              </button>
            </div>
          ))
        )}
      </div>

      {/* Botão de adicionar */}
      {!showForm && (
        <button className="btn add" onClick={handleAdd}>
          + Adicionar {userType === 'prestador' ? 'Conta' : 'Método'}
        </button>
      )}

      {/* Formulário de novo método */}
      {showForm && (
        <form className="payment-form" onSubmit={handleSubmit}>
          {!selectedType && (
            <>
              <label htmlFor="type">Tipo de Método</label>
              <select
                id="type"
                onChange={(e) => setSelectedType(e.target.value as any)}
                defaultValue=""
              >
                <option value="">Selecione...</option>
                <option value="PIX">Pix</option>
                {userType === 'cliente' && <option value="CARTÃO">Cartão</option>}
                {userType === 'prestador' && <option value="CONTA BANCÁRIA">Conta Bancária</option>}
              </select>
            </>
          )}

          {selectedType && renderFormFields()}

          {selectedType && (
            <div className="form-actions">
              <button type="button" className="btn cancel" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn primary" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default PaymentMethodsPanel;