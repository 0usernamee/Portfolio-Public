'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FeedbackSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const versions = [
  {
    version: 'v1.0',
    label: 'Initial High-Fidelity',
    description:
      'First visual pass focusing on feature completeness, establishing the primary colour palette and core booking flow.',
    tags: ['Colour system', 'Core flows', 'Initial layout'],
  },
  {
    version: 'v2.0',
    label: 'Optimised Mobile UI',
    description:
      'Refined for thumb-zone navigation, improved hierarchy, and tightened component spacing based on usability feedback.',
    tags: ['Mobile-first', 'Thumb-zone nav', 'Refined spacing'],
    highlighted: true,
  },
];

export default function FeedbackSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('[data-animate]'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.section} ref={sectionRef}>
      <div className={styles.header} data-animate>
        <p className={styles.eyebrow}>Iteration</p>
        <h2 className={styles.title}>Refining through feedback</h2>
      </div>

      <div className={styles.grid} data-animate>
        {versions.map((v) => (
          <div
            key={v.version}
            className={`${styles.card} ${v.highlighted ? styles.cardHighlighted : ''}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.versionBadge}>{v.version}</span>
              <span className={styles.versionLabel}>{v.label}</span>
            </div>
            <p className={styles.cardDescription}>{v.description}</p>
            <ul className={styles.tagList}>
              {v.tags.map((tag) => (
                <li key={tag} className={styles.tag}>{tag}</li>
              ))}
            </ul>
            {v.highlighted && (
              <span className={styles.currentBadge}>Current</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
