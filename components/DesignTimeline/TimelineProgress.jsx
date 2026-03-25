'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './TimelineProgress.module.css';

export function TimelineProgress({ steps, currentStep, openSteps, onStepClick }) {
  const progressLineRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    if (!progressLineRef.current) {
      return;
    }

    const denominator = Math.max(steps.length - 1, 1);
    const rawProgress = currentStep < 0 ? 0 : currentStep / denominator;
    const progress = Math.max(0, Math.min(1, rawProgress));

    gsap.to(progressLineRef.current, {
      scaleX: progress,
      duration: 0.45,
      ease: 'power2.out',
    });
  }, [currentStep, steps.length]);

  useEffect(() => {
    nodeRefs.current.forEach((node, index) => {
      if (!node) {
        return;
      }

      const isCurrent = index === currentStep;
      gsap.to(node, {
        scale: isCurrent ? 1.18 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, [currentStep]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track} aria-hidden="true" />
      <div className={styles.progress} ref={progressLineRef} aria-hidden="true" />

      <div className={styles.nodeRow}>
        {steps.map((step, index) => {
          const isOpen = openSteps.includes(index);
          const isCurrent = index === currentStep;
          const stepNumber = `Step ${String(index + 1).padStart(2, '0')}`;

          return (
            <button
              key={step}
              type="button"
              className={styles.nodeButton}
              onClick={() => onStepClick(index)}
              aria-label={`${stepNumber}: ${step}`}
            >
              <span
                className={`${styles.node} ${isOpen ? styles.nodeActive : ''} ${
                  isCurrent ? styles.nodeCurrent : ''
                }`}
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
              />
              <span className={styles.labelGroup}>
                <span className={`${styles.stepLabel} ${isOpen ? styles.stepLabelActive : ''}`}>
                  {stepNumber}
                </span>
                <span className={`${styles.titleLabel} ${isOpen ? styles.titleCurrent : ''}`}>
                  {step}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
