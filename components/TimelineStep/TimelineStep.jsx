'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TimelineStep.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineStep({ step, index }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const itemRef = useRef(null);
  const dotRef = useRef(null);
  const bodyRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (index === 0) {
        return;
      }

      gsap.from(itemRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          once: true,
        },
        delay: index * 0.08,
      });

      gsap.from(dotRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          once: true,
        },
        delay: index * 0.08 + 0.1,
      });
    });

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    const body = bodyRef.current;
    const content = contentRef.current;
    if (!body || !content) {
      return;
    }

    if (isOpen) {
      const height = content.scrollHeight;
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.45, ease: 'power2.out', onComplete: () => (body.style.height = 'auto') }
      );
    } else {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <li className={styles.item} ref={itemRef}>
      <div className={styles.stepHeader}>
        <div className={`${styles.dot} ${isOpen ? styles.dotActive : ''}`} ref={dotRef}>
          <span className={styles.dotInner} />
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.stepLabel}>{step.label}</span>
          <span className={styles.stepTitle}>{step.title}</span>
        </div>
      </div>

      <div className={styles.card}>
        <button
          className={styles.trigger}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={`step-body-${step.id}`}
        >
          <div className={styles.triggerRight}>
            <span className={styles.toggleLabel}>{isOpen ? 'Collapse' : 'Expand'}</span>
            <div className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
            <ChevronIcon />
            </div>
          </div>
        </button>

        <div
          id={`step-body-${step.id}`}
          className={styles.body}
          ref={bodyRef}
          style={{
            height: isOpen ? 'auto' : 0,
            overflow: 'hidden',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className={styles.bodyContent} ref={contentRef}>
            <div className={styles.block}>
              <p className={styles.blockLabel}>Objective</p>
              <p className={styles.objectiveText}>{step.objective}</p>
            </div>

            <div className={styles.block}>
              <p className={styles.blockLabel}>Critical Decisions</p>
              <ul className={styles.decisionList}>
                {step.decisions.map((decision, i) => (
                  <li key={i} className={styles.decisionItem}>
                    <span className={styles.decisionDot} aria-hidden="true" />
                    {decision}
                  </li>
                ))}
              </ul>
            </div>

            {step.impact && (
              <div className={styles.block}>
                <p className={styles.blockLabel}>Strategic Impact</p>
                <blockquote className={styles.impact}>
                  <span className={styles.impactIcon} aria-hidden="true">"</span>
                  {step.impact}
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
