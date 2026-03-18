'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TimelineCTA.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('[data-animate]'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.section} ref={sectionRef}>
      <blockquote className={styles.quote} data-animate>
        <span className={styles.quoteIcon} aria-hidden="true">"</span>
        My process ensured that every visual decision was grounded in research
        and usability, building a foundation of trust for Joey users.
      </blockquote>

      <div className={styles.ctaWrapper} data-animate>
        <a href="#final-design" className={styles.ctaButton}>
          Continue to Final Design
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
