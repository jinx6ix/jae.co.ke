'use client';

import { useEffect } from 'react';

export default function AsyncCSSInitializer() {
  useEffect(() => {
    // Only run in browser
    const links = document.querySelectorAll('link[data-async-css="true"]');

    links.forEach((link) => {
      // Switch from print/media="print" → all
      link.setAttribute('media', 'all');
      
      // Optional but recommended: remove the data attribute so we don't touch it again
      link.removeAttribute('data-async-css');
      
      // Optional: force browser to re-evaluate stylesheet
      // (sometimes helps with Safari / older browsers)
      const href = link.getAttribute('href');
      if (href) {
        link.setAttribute('href', href); // trigger reload
      }
    });
  }, []); // empty deps → run once after mount

  return null;
}