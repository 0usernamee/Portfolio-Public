'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './TimelineStep.module.css';

export function TimelineStep({ step, isOpen, onToggle, index }) {
  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current, {
        y: 24,
        duration: 0.55,
        ease: 'power2.out',
        delay: index * 0.06,
        clearProps: 'transform',
      });
    }, rootRef);

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    const body = bodyRef.current;
    const content = contentRef.current;
    if (!body || !content) {
      return;
    }

    gsap.killTweensOf(body);

    if (isOpen) {
      gsap.fromTo(
        body,
        { height: body.offsetHeight || 0, opacity: 0 },
        {
          height: content.scrollHeight,
          opacity: 1,
          duration: 0.48,
          ease: 'power3.out',
          onComplete: () => {
            body.style.height = 'auto';
          },
        }
      );
    } else {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.36,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen]);

  const blockClass = `${styles['timeline-step']} ${isOpen ? styles['timeline-step--open'] : styles['timeline-step--closed']}`;

  return (
    <article className={blockClass} ref={rootRef}>
      <button type="button" onClick={onToggle} className={styles['timeline-step__trigger']} aria-expanded={isOpen}>
        <div className={styles['timeline-step__trigger-meta']}>
          <span className={styles['timeline-step__index']}>{String(index + 1).padStart(2, '0')}</span>
          <div className={styles['timeline-step__titles']}>
            <h3 className={styles['timeline-step__title']}>{step.title}</h3>
            <p className={styles['timeline-step__description']}>{step.shortDesc}</p>
          </div>
        </div>
        <div className={styles['timeline-step__toggle']}>
          <span>{isOpen ? 'Collapse' : 'Expand Details'}</span>
          <span className={`${styles['timeline-step__chevron']} ${isOpen ? styles['timeline-step__chevron--open'] : ''}`}>
            <ChevronIcon />
          </span>
        </div>
      </button>

      <div
        className={styles['timeline-step__body']}
        ref={bodyRef}
        style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div className={styles['timeline-step__content']} ref={contentRef}>
          <div className={styles['timeline-step__grid']}>
            <div className={styles['timeline-step__column']}>
              <div className={styles['timeline-step__artifact']}>
                {step.image && (
                  <Image
                    src={step.image}
                    alt={`${step.title} artifact`}
                    className={styles['timeline-step__artifact-image']}
                    fill
                    sizes="(max-width: 940px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className={styles['timeline-step__artifact-footer']}>
                <span className={styles['timeline-step__artifact-dot']} />
                <p>Project Artifact: {step.title} Stage</p>
              </div>
            </div>

            <div className={`${styles['timeline-step__column']} ${styles['timeline-step__column--aside']}`}>
              <div className={styles['timeline-step__block']}>
                <h4 className={styles['timeline-step__block-heading']}>Objective</h4>
                <p className={styles['timeline-step__block-text']}>{step.goal}</p>
              </div>

              <div className={styles['timeline-step__block']}>
                <h4 className={`${styles['timeline-step__block-heading']} ${styles['timeline-step__block-heading--muted']}`}>
                  Critical Decisions
                </h4>
                <ul className={styles['timeline-step__decisions']}>
                  {step.decisions.map((decision) => (
                    <li key={decision} className={styles['timeline-step__decision']}>
                      <CheckCircleIcon />
                      <span className={styles['timeline-step__decision-text']}>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles['timeline-step__impact']}>
                <div className={styles['timeline-step__impact-tag']}>Strategic Impact</div>
                <p className={styles['timeline-step__impact-text']}>"{step.impact}"</p>
              </div>
            </div>
          </div>

          {step.comparison && (
            <div className={styles['timeline-step__comparison']}>
              <div className={styles['timeline-step__comparison-header']}>
                <h4 className={styles['timeline-step__comparison-kicker']}>The Iteration Loop</h4>
                <p className={styles['timeline-step__comparison-title']}>Refining through feedback</p>
              </div>

              <div className={styles['timeline-step__comparison-grid']}>
                <div className={styles['timeline-step__comparison-column']}>
                  <span className={styles['timeline-step__version-label']}>
                    v1.0 {step.comparison.early.label}
                  </span>
                  <div className={styles['timeline-step__version-frame']}>
                    {step.comparison.early.image && (
                      <Image
                        src={step.comparison.early.image}
                        alt={`v1.0 ${step.comparison.early.label}`}
                        className={styles['timeline-step__version-image']}
                        fill
                        sizes="(max-width: 680px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <p className={styles['timeline-step__version-caption']}>{step.comparison.early.caption}</p>
                </div>

                <div className={styles['timeline-step__comparison-column']}>
                  <span className={`${styles['timeline-step__version-label']} ${styles['timeline-step__version-label--emphasized']}`}>
                    v2.0 {step.comparison.later.label}
                  </span>
                  <div className={styles['timeline-step__version-frame']}>
                    {step.comparison.later.image && (
                      <Image
                        src={step.comparison.later.image}
                        alt={`v2.0 ${step.comparison.later.label}`}
                        className={styles['timeline-step__version-image']}
                        fill
                        sizes="(max-width: 680px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <p className={`${styles['timeline-step__version-caption']} ${styles['timeline-step__version-caption--emphasized']}`}>
                    {step.comparison.later.caption}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={styles['timeline-step__decision-icon']}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" opacity="0.4" />
      <path d="M8 12.5l2.4 2.4L16 9.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
