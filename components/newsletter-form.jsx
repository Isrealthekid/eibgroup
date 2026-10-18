"use client";

import { useState } from 'react';

export default function NewsletterForm() {
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // Connect the newsletter service here when signup functionality is ready.
    setStatus('Newsletter signup is coming soon.');
  }

  return (
    <form className="footer-newsletter" aria-label="Newsletter signup" onSubmit={handleSubmit}>
      <label htmlFor="footer-newsletter-email">Stay up to date.</label>
      <div className="footer-newsletter-fields">
        <input id="footer-newsletter-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="Enter your email" required maxLength={254} onChange={() => setStatus('')} />
        <button type="submit">Subscribe</button>
      </div>
      <p className="footer-newsletter-status" role="status">{status}</p>
    </form>
  );
}
