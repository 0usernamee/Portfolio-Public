'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './TimelineHeader.module.css';

export function TimelineHeader() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-header-animate]', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <header className={styles.header} ref={rootRef}>
      <div className={styles.pill} data-header-animate>
        <span>Process Storytelling</span>
      </div>
      <h1 className={styles.title} data-header-animate>
        Research &amp; Design.
      </h1>
      <p className={styles.subtitle} data-header-animate>
        My process is rooted in deep user research and strategic thinking, ensuring that every pixel
        serves a specific purpose in the Joey ecosystem.
      </p>
    </header>
  );
}
