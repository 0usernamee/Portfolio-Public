'use client';

import { useMemo, useState } from 'react';
import styles from './DesignTimeline.module.css';
import { TimelineHeader } from './TimelineHeader';
import { TimelineProgress } from './TimelineProgress';
import { TimelineStep } from './TimelineStep';
import marketResearchImage from '@/app/images/market-reseach.png';
import uxStrategyImage from '@/app/images/ux-strat.png';
import lowFidelityImage from '@/app/images/low-fi.png';
import interactivePrototypeImage from '@/app/images/interactive-prototype.png';
import visualIdentityImage from '@/app/images/visual-identity.png';
import iterationHandoffImage from '@/app/images/iteration-handoff.png';
import hiFiRevampImage from '@/app/images/hi-fi-revamp-page.png';

const JOEY_STEPS = [
  {
    title: 'Market Research',
    shortDesc: 'Analyzing the tradesperson landscape and homeowner friction points',
    image: marketResearchImage,
    goal: 'Identify the structural gaps in existing labor marketplaces that lead to a lack of trust.',
    decisions: [
      'Conducted 12+ deep-dive interviews with local tradespeople',
      'Synthesized market data to define the Joey value proposition',
      'Mapped legal and liability requirements for gig-economy platforms',
    ],
    impact: 'Established trust and transparency as the foundational pillars of the Joey brand.',
  },
  {
    title: 'UX Strategy',
    shortDesc: 'Mapping human-centered flows for a complex two-sided marketplace',
    image: uxStrategyImage,
    goal: 'Create a seamless logic for homeowners to find verified labor without technical overhead.',
    decisions: [
      'Engineered a Job-Creation Wizard to standardize service requests',
      'Integrated a robust verification flow for tradespeople',
      'Simplified complex booking states into 3 intuitive milestones',
    ],
    impact: 'Reduced cognitive load by translating technical logistics into clear human actions.',
  },
  {
    title: 'Low-Fidelity',
    shortDesc: 'Defining structural hierarchy and core navigation',
    image: lowFidelityImage,
    goal: 'Validate the information hierarchy for both user personas (Homeowner vs. Tradesperson).',
    decisions: [
      'Prioritized thumb-zone navigation for mobile-first utility',
      'Structured profile layouts to highlight reviews and certifications',
      'Drafted a modular dashboard system for active job tracking',
    ],
    impact: 'Ensured that the application logic was sound before investing in visual polish.',
  },
  {
    title: 'Interactive Prototyping',
    shortDesc: 'Testing motion and state transitions in Mid-Fi',
    image: interactivePrototypeImage,
    goal: 'Simulate the end-to-end booking experience to identify friction points.',
    decisions: [
      'Implemented conditional logic for verification uploads',
      'Refined loading states to manage user expectations during AI matching',
      'Optimized the mobile search experience with persistent filters',
    ],
    impact: 'Bridge the gap between static screens and the dynamic reality of a live marketplace.',
  },
  {
    title: 'Visual Identity',
    shortDesc: 'Applying Joey branding and high-fidelity polish',
    image: visualIdentityImage,
    goal: 'Evoke a sense of safety and professionalism through a refined visual language.',
    decisions: [
      'Adopted a vibrant Joey Orange (#F56B09) for key conversion points',
      'Developed a custom iconography system for various trade categories',
      'Ensured AA accessibility standards for all interactive elements',
    ],
    impact: 'Created a cohesive, high-trust visual environment that feels both friendly and expert.',
  },
  {
    title: 'Iteration & Handoff',
    shortDesc: 'Refining the final UI based on developer feedback and testing',
    image: iterationHandoffImage,
    goal: 'Scale the design system for real-world edge cases and technical constraints.',
    decisions: [
      'Redesigned the notification center for better task prioritization',
      'Optimized asset weight for faster loading on cellular data',
      'Standardized spacing tokens for seamless dev handoff in Next.js',
    ],
    impact: 'Ensured the final product was as performant and scalable as it was beautiful.',
    comparison: {
      early: {
        label: 'Initial High-Fi',
        image: hiFiRevampImage,
        caption: 'Overly complex data tables that were difficult to parse on mobile devices.',
      },
      later: {
        label: 'Optimized Mobile UI',
        image: interactivePrototypeImage,
        caption: 'Converted tables to a card-based swipe interface, increasing engagement by 35%.',
      },
    },
  },
];

export default function DesignTimeline() {
  const [openSteps, setOpenSteps] = useState([0]);

  const currentProgressStep = useMemo(() => {
    if (openSteps.length === 0) {
      return -1;
    }
    return Math.max(...openSteps);
  }, [openSteps]);

  const toggleStep = (index) => {
    setOpenSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const setProgressStep = (index) => {
    setOpenSteps(Array.from({ length: index + 1 }, (_, i) => i));
  };

  return (
    <section className={styles.section}>
      <div className={styles.glowRight} aria-hidden="true" />
      <div className={styles.glowLeft} aria-hidden="true" />

      <TimelineHeader />

      <TimelineProgress
        steps={JOEY_STEPS.map((step) => step.title)}
        currentStep={currentProgressStep}
        openSteps={openSteps}
        onStepClick={setProgressStep}
      />

      <div className={styles.container}>
        <ol className={styles.stepList}>
          {JOEY_STEPS.map((step, index) => (
            <li key={step.title} className={styles.stepListItem}>
              <TimelineStep
                step={step}
                index={index}
                isOpen={openSteps.includes(index)}
                onToggle={() => toggleStep(index)}
              />
            </li>
          ))}
        </ol>

        <div className={styles.conclusion}>
          <p className={styles.quote}>
            "My process ensured that <span>every visual decision</span> was grounded in research and
            usability, building a foundation of trust for Joey users."
          </p>
          <div className={styles.conclusionActions}>
            <button className={styles.ctaButton}>Continue to Final Designs</button>
            <ArrowDownIcon />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowDownIcon() {
  return (
    <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4v13m0 0l-5-5m5 5l5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
