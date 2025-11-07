import React from "react";
import "./request.css";

export default function ServiceRequest() {
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

        <textarea
          placeholder="Diga todos os detalhes importantes de seu serviço"
          rows={3}
        />

        <label htmlFor="valor">Orçamento oferecido:</label>
        <p className="subtext">
          Sugira um preço adequado para o tipo de serviço que procura, o valor
          final poderá ser negociado diretamente.
        </p>
        <input type="text" id="valor" placeholder="Valor" />

        <fieldset>
          <legend>Tempo de Serviço</legend>
          <div className="checkbox-group">
            <label><input type="checkbox" defaultChecked /> Imediato</label>
            <label><input type="checkbox" /> 2 a 6 dias</label>
            <label><input type="checkbox" /> 1 a 3 semanas</label>
            <label><input type="checkbox" /> 1 mês ou mais</label>
          </div>
        </fieldset>
      </section>
    </main>
  );
}
