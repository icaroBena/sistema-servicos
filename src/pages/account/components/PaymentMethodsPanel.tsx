// src/pages/account/components/PaymentMethodsPanel.tsx

import React, { useEffect, useState } from "react";
import { loadFromLocal, saveToLocal } from "../../../utils/localFallback";
import "./account-tabs-style.css";

interface PaymentMethod {
  id: string;
  type: "PIX" | "CARD" | "BANK_ACCOUNT";
  label: string;
  data: Record<string, string>;
}

interface PaymentMethodsPanelProps {
  // internal prop now in English: 'client' | 'provider'
  userType: "client" | "provider";
}

const PaymentMethodsPanel: React.FC<PaymentMethodsPanelProps> = ({ userType }) => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "PIX" | "CARD" | "BANK_ACCOUNT" | ""
  >("");

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const list = loadFromLocal<PaymentMethod[]>("paymentMethods", []);
    if (list) setMethods(list);
  }, []);

  useEffect(() => {
    try {
      saveToLocal("paymentMethods", methods);
    } catch (e) {
      // ignore
    }
  }, [methods]);

  const handleAdd = () => {
    setShowForm(true);
    setSelectedType("");
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const method: PaymentMethod = {
        id: String(Date.now()),
        type: selectedType as any,
        label:
          selectedType === "PIX"
            ? formData.pixKey
            : selectedType === "CARD"
            ? `${formData.brand} •••• ${formData.cardNumber?.slice(-4)}`
            : `${formData.bank} - Ag ${formData.agency} / CC ${formData.account}`,
        data: formData,
      };

      setMethods(prev => [...prev, method]);
      setShowForm(false);
      setLoading(false);
    }, 700);
  };

  const remove = (id: string) => {
    setMethods(prev => prev.filter(m => m.id !== id));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const renderForm = () => {
    switch (selectedType) {
      case "PIX":
        return (
          <>
            <label>Chave Pix</label>
            <input
              id="pixKey"
              placeholder="email, telefone, CPF"
              onChange={handleChange}
            />
          </>
        );

      case "CARD":
        return (
          <>
            <label>Bandeira</label>
            <select id="brand" onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Elo">Elo</option>
            </select>

            <label>Número do Cartão</label>
            <input
              id="cardNumber"
              maxLength={16}
              placeholder="•••• •••• •••• ••••"
              onChange={handleChange}
            />

            <label>Validade</label>
            <input id="expires" placeholder="MM/AA" onChange={handleChange} />

            <label>Nome do Titular</label>
            <input id="cardHolder" onChange={handleChange} />
          </>
        );

      case "BANK_ACCOUNT":
        return (
          <>
            <label>Banco</label>
            <input id="bank" onChange={handleChange} />

            <label>Agência</label>
            <input id="agency" onChange={handleChange} />

            <label>Conta</label>
            <input id="account" onChange={handleChange} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="panel">
      <h3>
        {userType === "provider" ? "Métodos de Recebimento" : "Métodos de Pagamento"}
      </h3>

      <p>
        {userType === "provider"
          ? "Adicione formas de receber pelos seus serviços."
          : "Adicione métodos de pagamento para contratar prestadores."}
      </p>

      <div className="payment-list">
        {methods.length === 0 ? (
          <p>Nenhum método cadastrado.</p>
        ) : (
          methods.map(m => (
            <div key={m.id} className="payment-item">
              <span>
                <strong>{m.type}</strong> — {m.label}
              </span>

              <button className="btn payment-remove" onClick={() => remove(m.id)}>
                Remover
              </button>
            </div>
          ))
        )}
      </div>

      {!showForm && (
        <button className="btn add" onClick={handleAdd}>
          + Adicionar {userType === "provider" ? "Conta" : "Método"}
        </button>
      )}

      {showForm && (
        <form className="payment-form" onSubmit={handleSubmit}>
          {!selectedType && (
            <>
              <label>Tipo de Método</label>
              <select
                id="type"
                onChange={e =>
                  setSelectedType(e.target.value as any)
                }
                defaultValue=""
              >
                <option value="">Selecione...</option>
                <option value="PIX">Pix</option>
                {userType === "client" && <option value="CARD">Cartão</option>}
                {userType === "provider" && (
                  <option value="BANK_ACCOUNT">Conta Bancária</option>
                )}
              </select>
            </>
          )}

          {selectedType && renderForm()}

          {selectedType && (
            <div className="form-actions">
              <button
                type="button"
                className="btn cancel"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>

              <button type="submit" className="btn primary" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default PaymentMethodsPanel;
