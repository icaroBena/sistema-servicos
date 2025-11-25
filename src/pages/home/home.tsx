// src/pages/home/home.tsx

import { useNavigate } from "react-router-dom";

// Components
import ServiceCard from "../../components/ServiceCard";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RecommendationCard from "../../components/RecommendationCard";

// Styles
import "../../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  const goToServiceRequests = (service?: string) => {
    // Caso futuramente a gente envie o tipo como query:
    // navigate(`/service/request?category=${encodeURIComponent(service ?? "")}`);

    // mark parameter as used to avoid unused-variable warning until query is implemented
    void service;

    navigate("/service/request");
  };

  return (
    <div className="wm-home">
      {/* NAV */}
      <Navbar />

      <main className="wm-main">

        {/* SEÇÃO: POPULARES */}
        <section className="wm-popular-services">
          <h1 className="wm-h2-popular-services">Pedidos Populares</h1>

          <div className="wm-services-list">
            <ServiceCard
              title="Diarista"
              imgSrc="/Figures/diarista.png"
              buttonText="Ver Orçamentos"
              onClick={() => goToServiceRequests("Diarista")}
            />

            <ServiceCard
              title="Jardinagem"
              imgSrc="/Figures/jardinagem.png"
              buttonText="Ver Orçamentos"
              onClick={() => goToServiceRequests("Jardinagem")}
            />

            <ServiceCard
              title="Personal Trainer"
              imgSrc="/Figures/personal_trainer.png"
              buttonText="Ver Orçamentos"
              onClick={() => goToServiceRequests("Personal Trainer")}
            />
          </div>
        </section>

        {/* COMO PEDIR */}
        <section className="wm-how-to">
          <h2>Como pedir um serviço</h2>

          <div className="wm-how-to-content">
            <p>Procure um serviço e descubra como é simples!</p>

            <Button variant="primary" onClick={() => navigate("/service/request")}>
              Ver serviços
            </Button>
          </div>
        </section>

        {/* SERVIÇOS DISPONÍVEIS */}
        <div className="home-container">
          <h1>Serviços Disponíveis</h1>

          <div className="recommendation-list">
            <RecommendationCard
              title="Instalações e Manutenções Domésticas"
              category="Instalações Elétricas"
              price="R$119"
              rating={4}
              phone="(00) 00000-0000"
              imgSrc="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
            />

            <RecommendationCard
              title="Reformação de Segurança"
              category="Projetos e Adequações"
              price="R$240"
              rating={5}
              phone="(00) 00000-0000"
              imgSrc="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
            />

            <RecommendationCard
              title="Serviço de Manutenção"
              category="Manutenção Preventiva e Corretiva"
              price="R$164"
              rating={3}
              phone="(00) 00000-0000"
              imgSrc="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
            />

            <RecommendationCard
              title="O Mano Eletricista"
              category="Instalações Elétricas"
              price="R$320"
              rating={5}
              phone="(00) 00000-0000"
              imgSrc="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
