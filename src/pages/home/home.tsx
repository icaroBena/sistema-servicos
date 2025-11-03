import ServiceCard from "../../components/ServiceCard";
import Button from "../../components/Button.tsx";
import Footer from "../../components/Footer.tsx";
import Navbar from "../../components/Navbar.tsx"
import  "../../styles/home.css"


export default function Home() {
  return (
    <div className="wm-home">
      <Navbar />
      <main className="wm-main">
        {/* Pedidos Populares */}
        <section className="wm-popular-services">
            <div>
                <h1 className="wm-h2-popular-services">Pedidos Populares</h1>
            </div>
          
          <div className="wm-services-list">
            <ServiceCard title="Diarista" imgSrc="../../Figures/diarista.avif" buttonText="Ver Orçamentos" />
            <ServiceCard title="Jardinagem" imgSrc="../../Figures/jardinagem.avif" buttonText="Ver Orçamentos" />
            <ServiceCard title="Personal Trainer" imgSrc="/Figures/personal trainer.avif" buttonText="Ver Orçamentos" />
          </div>
        </section>
{/* Paulo esteve aqui*/}
        {/* Como pedir um serviço */}
        <section className="wm-how-to">
          <h2>Como pedir um serviço</h2>
          <div className="wm-how-to-content">
            <p>Procure um serviço e descubra como é simples!</p>
            <Button variant="primary">Ver serviços</Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
