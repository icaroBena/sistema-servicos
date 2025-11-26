import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./request.css";

type TempoServico = "imediato" | "2-6" | "1-3" | "1m+";

export default function ServiceRequest() {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tempo, setTempo] = useState<TempoServico>("imediato");
  const [files, setFiles] = useState<File[]>([]);

  const previews = useMemo(() => files.map(f => URL.createObjectURL(f)), [files]);

  function handleChangeFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files ? Array.from(e.target.files) : [];
    const safeFiles = list.filter(f => f.size <= 5 * 1024 * 1024);
    setFiles(safeFiles);
  }

  // formatação de moeda
  function formatMoney(v: string) {
    const num = Number(v.replace(/\D/g, "")) / 100;
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    localStorage.setItem("@wm_orcamento", valor); // salva para próxima página

    navigate("/confirm-service");
  }

  return (
    <main className="sr-container">
      <h1 className="sr-title">Serviço de Instalações e Manutenções Domésticas</h1>

      {/* CARD */}
      <section className="sr-service-card">
        <img
          src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
          className="sr-service-img"
          alt="Profissional"
        />

        <div className="sr-service-info">
          <p className="sr-service-desc">
            (Descrição adicionada pelo prestador para exposição de serviço)
          </p>
          <strong>Categorias disponíveis:</strong>
          <p>Instalações Elétricas</p>
          <p>Manutenção Preventiva e Corretiva</p>
          <div className="sr-rating">★★★★★</div>
        </div>

        <div className="sr-service-side">
          <p className="sr-side-label">Serviços em volta de</p>
          <p className="sr-side-price">R$119</p>
          <p className="sr-side-contact">(00) 00000-0000</p>
        </div>
      </section>

      {/* FORM */}
      <section className="sr-form-box">
        <h2 className="sr-form-title">Qual tipo de serviço você procura?</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            className="sr-input sr-textarea"
            placeholder="Descreva o serviço desejado"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <label className="sr-label" htmlFor="valor">Orçamento oferecido</label>
          <p className="sr-subtext">Sugira o valor ideal, porém negociável.</p>

          {/* CAMPO EDITADO */}
          <input
            id="valor"
            type="text"
            className="sr-input"
            placeholder="R$ 0,00"
            value={valor}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              setValor(formatMoney(onlyNumbers));
            }}
            required
          />

          <fieldset className="sr-fieldset">
            <legend>Tempo de serviço</legend>

            <div className="sr-radio-group">
              <label><input type="radio" checked={tempo === "imediato"} onChange={() => setTempo("imediato")} />Imediato</label>
              <label><input type="radio" checked={tempo === "2-6"} onChange={() => setTempo("2-6")} />2 a 6 dias</label>
              <label><input type="radio" checked={tempo === "1-3"} onChange={() => setTempo("1-3")} />1 a 3 semanas</label>
              <label><input type="radio" checked={tempo === "1m+"} onChange={() => setTempo("1m+")} />1 mês ou mais</label>
            </div>
          </fieldset>

          {previews.length > 0 && (
            <div className="sr-preview-grid">
              {previews.map((src, i) => (
                <img key={i} src={src} className="sr-preview-img" />
              ))}
            </div>
          )}

          <div className="sr-actions">
            <button className="sr-btn sr-btn-primary" type="submit">
              Enviar solicitação
            </button>

            <button
              className="sr-btn sr-btn-secondary"
              type="button"
              onClick={() => { setDescricao(""); setValor(""); setFiles([]); }}
            >
              Limpar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
