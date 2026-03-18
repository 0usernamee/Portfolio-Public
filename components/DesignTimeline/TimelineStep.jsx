'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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

  return (
    <article className={`${styles.card} ${isOpen ? styles.cardOpen : styles.cardClosed}`} ref={rootRef}>
      <button type="button" onClick={onToggle} className={styles.cardButton} aria-expanded={isOpen}>
        <div className={styles.leftMeta}>
          <span className={styles.indexLabel}>{String(index + 1).padStart(2, '0')}</span>
          <div className={styles.titleGroup}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.shortDesc}>{step.shortDesc}</p>
          </div>
        </div>
        <div className={styles.toggleMeta}>
          <span>{isOpen ? 'Collapse' : 'Expand Details'}</span>
          <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
            <ChevronIcon />
          </span>
        </div>
      </button>

      <div
        className={styles.expanded}
        ref={bodyRef}
        style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div className={styles.expandedContent} ref={contentRef}>
          <div className={styles.grid}>
            <div className={styles.leftColumn}>
              <div className={styles.artifactPlaceholder} />
              <div className={styles.artifactMeta}>
                <span className={styles.artifactDot} />
                <p>Project Artifact: {step.title} Stage</p>
              </div>
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Objective</h4>
                <p className={styles.blockText}>{step.goal}</p>
              </div>

              <div className={styles.block}>
                <h4 className={styles.blockTitleMuted}>Critical Decisions</h4>
                <ul className={styles.decisionList}>
                  {step.decisions.map((decision) => (
                    <li key={decision} className={styles.decisionItem}>
                      <CheckCircleIcon />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.impactCard}>
                <div className={styles.impactTag}>Strategic Impact</div>
                <p>"{step.impact}"</p>
              </div>
            </div>
          </div>

          {step.comparison && (
            <div className={styles.comparison}>
              <div className={styles.comparisonHeader}>
                <h4>The Iteration Loop</h4>
                <p>Refining through feedback</p>
              </div>

              <div className={styles.comparisonGrid}>
                <div className={styles.comparisonColumn}>
                  <span className={styles.versionLabel}>v1.0 {step.comparison.early.label}</span>
                  <div className={styles.versionPlaceholder} />
                  <p className={styles.versionCaption}>{step.comparison.early.caption}</p>
                </div>

                <div className={styles.comparisonColumn}>
                  <span className={styles.versionLabelStrong}>v2.0 {step.comparison.later.label}</span>
                  <div className={styles.versionPlaceholder} />
                  <p className={styles.versionCaptionStrong}>{step.comparison.later.caption}</p>
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.checkIcon}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" opacity="0.4" />
      <path d="M8 12.5l2.4 2.4L16 9.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
