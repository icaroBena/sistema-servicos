import React, { useMemo, useState } from "react";
import "./request.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button.tsx";





type TempoServico = "imediato" | "2-6" | "1-3" | "1m+";

export default function ServiceRequest() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tempo, setTempo] = useState<TempoServico>("imediato");
  const [files, setFiles] = useState<File[]>([]);

  const navigate = useNavigate();
const EnviarSolicitacao = () => {
  navigate("/confirm-service");
};

  // gera pré-visualizações das fotos
  const previews = useMemo(() => files.map(f => URL.createObjectURL(f)), [files]);

  function handleChangeFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files ? Array.from(e.target.files) : [];
    const seguros = list.filter(f => f.size <= 5 * 1024 * 1024); // até 5 MB
    setFiles(seguros);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const form = new FormData();
    form.append("descricao", descricao);
    form.append("valor", valor);
    form.append("tempo", tempo);
    files.forEach((f, i) => form.append("fotos", f, f.name));

    // aqui vai sua integração com API (exemplo)
    // await fetch("/api/solicitacoes", { method: "POST", body: form });

    console.log("Enviando solicitação...", { descricao, valor, tempo, files });
    alert("Solicitação enviada com sucesso!");

    // limpa o formulário
    setDescricao("");
    setValor("");
    setTempo("imediato");
    setFiles([]);
  }

  return (
    <main className="request-container">
      <h1>Serviço de Instalações e Manutenções Domésticas</h1>

      <section className="service-card">
        <img
          src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
          alt="Profissional elétrico"
          className="service-image"
        />
        <div className="service-info">
          <p className="descricao">
            (Descrição adicionada pelo prestador para exposição de serviço)
          </p>
          <p><strong>Categorias disponíveis:</strong></p>
          <p>Instalações Elétricas</p>
          <p>Manutenção Preventiva e Corretiva</p>
          <div className="avaliacao">★★★★★</div>
        </div>
        <div className="service-side">
          <p className="valor">Serviços em volta de</p>
          <p className="preco">R$119</p>
          <p className="contato">(00) 00000-0000</p>
        </div>
      </section>

      <section className="form-box">
        <h2>Qual tipo de serviço você procura?</h2>

        <form onSubmit={handleSubmit}>
          {/* descrição */}
          <textarea
            placeholder="Diga todos os detalhes importantes de seu serviço"
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          {/* valor */}
          <label htmlFor="valor">Orçamento oferecido:</label>
          <p className="subtext">
            Sugira um preço adequado para o tipo de serviço que procura, o valor
            final poderá ser negociado diretamente.
          </p>
          <input
            type="text"
            id="valor"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          {/* tempo de serviço */}
          <fieldset>
            <legend>Tempo de Serviço</legend>
            <div className="radio-group">
              <label><input type="radio" name="tempo" checked={tempo==="imediato"} onChange={() => setTempo("imediato")} /> Imediato</label>
              <label><input type="radio" name="tempo" checked={tempo==="2-6"} onChange={() => setTempo("2-6")} /> 2 a 6 dias</label>
              <label><input type="radio" name="tempo" checked={tempo==="1-3"} onChange={() => setTempo("1-3")} /> 1 a 3 semanas</label>
              <label><input type="radio" name="tempo" checked={tempo==="1m+"} onChange={() => setTempo("1m+")} /> 1 mês ou mais</label>
            </div>
          </fieldset>

          {/* upload de fotos */}
          <div className="upload-block">
            <label htmlFor="fotos" className="upload-label">Fotos do serviço (opcional)</label>
            <input
              id="fotos"
              type="file"
              accept="image/*"
              multiple
              onChange={handleChangeFiles}
            />
            {files.length > 0 && (
              <div className="preview-grid">
                {previews.map((src, idx) => (
                  <div key={idx} className="preview-item">
                    <img src={src} alt={`preview-${idx}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* botões */}
          <div className="actions">
            <Button variant="primary" onClick={EnviarSolicitacao}>
              Enviar solicitação
            </Button>
            <button
              type="button"
              className="btn-secondary"
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
