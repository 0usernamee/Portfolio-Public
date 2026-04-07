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
    <div className={styles['timeline-progress']}>
      <div className={styles['timeline-progress__track']} aria-hidden="true" />
      <div className={styles['timeline-progress__fill']} ref={progressLineRef} aria-hidden="true" />

      <div className={styles['timeline-progress__nodes']}>
        {steps.map((step, index) => {
          const isOpen = openSteps.includes(index);
          const isCurrent = index === currentStep;
          const stepNumber = `Step ${String(index + 1).padStart(2, '0')}`;

          const nodeClass = [
            styles['timeline-progress__node'],
            isOpen ? styles['timeline-progress__node--active'] : '',
            isCurrent ? styles['timeline-progress__node--current'] : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={step}
              type="button"
              className={styles['timeline-progress__node-button']}
              onClick={() => onStepClick(index)}
              aria-label={`${stepNumber}: ${step}`}
            >
              <span
                className={nodeClass}
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
              />
              <span className={styles['timeline-progress__labels']}>
                <span
                  className={`${styles['timeline-progress__step-label']} ${
                    isOpen ? styles['timeline-progress__step-label--active'] : ''
                  }`}
                >
                  {stepNumber}
                </span>
                <span
                  className={`${styles['timeline-progress__step-title']} ${
                    isOpen ? styles['timeline-progress__step-title--current'] : ''
                  }`}
                >
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
