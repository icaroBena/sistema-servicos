import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./request.css";

type TempoServico = "imediato" | "2-6" | "1-3" | "1m+";

export default function ServiceRequest() {
  const navigate = useNavigate();

  // Internals em inglês
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tempo, setTempo] = useState<TempoServico>("imediato");
  const [files, setFiles] = useState<File[]>([]);

  const previews = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files]
  );

  function handleChangeFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    const safeFiles = selected.filter((f) => f.size <= 5 * 1024 * 1024);
    setFiles(safeFiles);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      serviceId: "SERVICE-ID-MISSING-BACKEND",
      description: description,
      offeredValue: Number(price.replace(/\D/g, "")) / 100,
      estimatedTime: tempo,
      attachments: files,
      category: "Instalações Elétricas",
    };

    alert("Solicitação enviada!");
    navigate("/confirm-service", { state: payload });
  }

  return (
    <main className="sr-container">
      <h1 className="sr-title">Serviço de Instalações e Manutenções Domésticas</h1>

      {/* CARD DO SERVIÇO */}
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

      {/* FORMULÁRIO */}
      <section className="sr-form-box">
        <h2 className="sr-form-title">Qual tipo de serviço você procura?</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            className="sr-input sr-textarea"
            placeholder="Descreva o serviço desejado"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="sr-label" htmlFor="price">Orçamento oferecido</label>
          <p className="sr-subtext">
            Sugira o valor ideal (negociável).
          </p>
          <input
            id="price"
            type="text"
            className="sr-input"
            placeholder="R$ 0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <fieldset className="sr-fieldset">
            <legend>Tempo de serviço</legend>

            <div className="sr-radio-group">
              <label>
                <input
                  type="radio"
                  checked={tempo === "imediato"}
                  onChange={() => setTempo("imediato")}
                />
                Imediato
              </label>

              <label>
                <input
                  type="radio"
                  checked={tempo === "2-6"}
                  onChange={() => setTempo("2-6")}
                />
                2 a 6 dias
              </label>

              <label>
                <input
                  type="radio"
                  checked={tempo === "1-3"}
                  onChange={() => setTempo("1-3")}
                />
                1 a 3 semanas
              </label>

              <label>
                <input
                  type="radio"
                  checked={tempo === "1m+"}
                  onChange={() => setTempo("1m+")}
                />
                1 mês ou mais
              </label>
            </div>
          </fieldset>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleChangeFiles}
          />

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
              onClick={() => {
                setDescription("");
                setPrice("");
                setFiles([]);
              }}
            >
              Limpar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
