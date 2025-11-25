// src/pages/account/components/ServicesPanel.tsx
import React, { useState, useEffect } from "react";
import ServiceFormModal from "./popups/ServiceFormModal";
import type { Service } from "../../../models/Servico";
import "./account-tabs-style.css";

const MAX = 3;

const ServicesPanel: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<Service | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("services");
    if (saved) {
      try {
        setServices(JSON.parse(saved));
      } catch {
        setServices([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  const openAdd = () => {
    if (services.length >= MAX) {
      alert("Limite máximo de serviços atingido (3).");
      return;
    }
    setEdit(null);
    setModalOpen(true);
  };

  const save = (s: Service) => {
    if (!s.id) s.id = Date.now().toString();

    if (edit) {
      setServices(prev => prev.map(item => item.id === s.id ? s : item));
    } else {
      setServices(prev => [...prev, s]);
    }

    setModalOpen(false);
    setEdit(null);
  };

  const remove = (id: string) => {
    if (confirm("Deseja remover este serviço?")) {
      setServices(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="panel">
      <h3>Meus Serviços</h3>
      <p>Gerencie e publique serviços visíveis para os clientes.</p>

      <button
        className="btn add"
        onClick={openAdd}
        disabled={services.length >= MAX}
      >
        + Criar Serviço
      </button>

      {services.length >= MAX && (
        <p className="limit-warning">Limite máximo de serviços: 3.</p>
      )}

      <div className="srv-list">
        {services.length === 0 && <p>Nenhum serviço criado.</p>}

        {services.map(s => (
          <div key={s.id} className="srv-card">
            <img src={s.imageUrl ?? ""} className="srv-img" />

            <div className="srv-info">
              <h4>{s.title}</h4>
              <p className="desc">{s.description}</p>
              <p><b>Categoria:</b> {s.category}</p>
            </div>

            <div className="srv-right">
              <span className="price">R$ {s.price}</span>

              <button
                className="small"
                onClick={() => {
                  setEdit(s);
                  setModalOpen(true);
                }}
              >
                Editar
              </button>

              <button
                className="small remove"
                onClick={() => remove(s.id)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <ServiceFormModal
          existing={edit}
          onClose={() => {
            setModalOpen(false);
            setEdit(null);
          }}
          onSave={save}
        />
      )}
    </div>
  );
};

export default ServicesPanel;
