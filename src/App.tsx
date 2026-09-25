import Hero from './components/Hero';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useEffect, useRef, useState } from 'react';
import Training from './components/Training';
import PresentationSection from './components/PresentationSection';
import TeamSection from './components/TeamSection';
import Plans from './components/Plans';
import Stories from './components/Stories';
import AppSection from './components/AppSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import EnrollmentModal from './components/EnrollmentModal';
export default function App() {
  useSmoothScroll();
  const [selected, setSelected] = useState<string | null>(null);
  const [enrollmentPlan, setEnrollmentPlan] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  const continueToEnrollment = () => {
    const plan = selected;
    setSelected(null);
    if (plan) window.setTimeout(() => setEnrollmentPlan(plan), 0);
  };
  return (
    <>
      <a className="skip-link" href="#sobre">
        Pular para o conteúdo
      </a>
      <main>
        <Hero />
        <PresentationSection />
        <Training />
        <Plans onSelect={setSelected} />
        <TeamSection />
        <Stories />
        <AppSection />
        <Newsletter />
        <Footer />
      </main>
      <dialog
        ref={dialog}
        className="plan-dialog"
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        <button
          className="close-modal"
          aria-label="Fechar"
          onClick={() => setSelected(null)}
        >
          ×
        </button>
        <span className="eyebrow">SUA PRÓXIMA CONQUISTA</span>
        <h2>PLANO {selected}</h2>
        <p>
          Você escolheu seu próximo passo. Os planos e valores desta prévia são
          demonstrativos; a matrícula será disponibilizada quando os canais
          oficiais forem configurados.
        </p>
        <button className="cta" onClick={continueToEnrollment}>
          CONTINUAR EXPLORANDO <span>➜</span>
        </button>
      </dialog>
      <EnrollmentModal selectedPlan={enrollmentPlan} onClose={() => setEnrollmentPlan(null)} />
    </>
  );
}
