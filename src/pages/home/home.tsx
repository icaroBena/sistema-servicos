// src/pages/home/home.tsx
import ServiceCard from "../../components/ServiceCard";
import Button from "../../components/Button.tsx";
import Footer from "../../components/Footer.tsx";
import Navbar from "../../components/Navbar.tsx";
import RecommendationCard from "../../components/RecommendationCard.tsx";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToServiceRequests = (service?: string) => {
    // se quiser levar o tipo também:
    // navigate(`/service-requests?type=${encodeURIComponent(service ?? "")}`);
    navigate("/service-requests");
  };

  return (
    <div className="wm-home">
      <Navbar />
      <main className="wm-main">
        <section className="wm-popular-services">
          <div>
            <h1 className="wm-h2-popular-services">Pedidos Populares</h1>
          </div>

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

        <section className="wm-how-to">
          <h2>Como pedir um serviço</h2>
          <div className="wm-how-to-content">
            <p>Procure um serviço e descubra como é simples!</p>
            <Button variant="primary" onClick={() => navigate("/service-requests")}>
              Ver serviços
            </Button>
          </div>
        </section>

        <div className="home-container">
      <h1>Recomendações</h1>
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
