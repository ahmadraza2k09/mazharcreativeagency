import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Team from './components/Team';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Marquee from './components/Marquee';

function HomePage() {
  return <><Hero /><Marquee /></>;
}

function AboutPage() {
  return <><About /><Clients /></>;
}

function ServicesPage() {
  return <><Services /><WhyChooseUs /><Process /></>;
}

function WorkPage() {
  return <><Portfolio /><Clients /></>;
}

function TeamPage() {
  return <Team />;
}

function ContactPage() {
  return <Contact />;
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const page = path === '/about' ? <AboutPage />
    : path === '/services' ? <ServicesPage />
      : path === '/work' ? <WorkPage />
        : path === '/team' ? <TeamPage />
          : path === '/contact' ? <ContactPage />
            : <HomePage />;
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
      <main>{page}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
