// ============================================================
// ROOT — App.jsx
// Wires all ViewModels into Views
// ============================================================

import { useNavViewModel, useContactViewModel, useTestimonialViewModel } from './viewmodels.js';
import { Model } from './model.js';

import Nav          from './components/Nav.jsx';
import Hero         from './components/Hero.jsx';
import Stats        from './components/Stats.jsx';
import Services     from './components/Services.jsx';
import Work         from './components/Work.jsx';
import About        from './components/About.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact      from './components/Contact.jsx';
import Footer       from './components/Footer.jsx';

export default function App() {
  // ── ViewModels ──
  const navVM         = useNavViewModel();
  const contactVM     = useContactViewModel();
  const testimonialVM = useTestimonialViewModel(Model.testimonials);

  // Shared scroll utility
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // ── View ──
  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh' }}>
      <Nav          vm={navVM} />
      <Hero         onCTAClick={scrollTo} />
      <Stats />
      <Services />
      <Work />
      <About />
      <Testimonials vm={testimonialVM} />
      <Contact      vm={contactVM} />
      <Footer />
    </div>
  );
}
