"use client";

import { useEffect, useState } from 'react';

export default function NewsletterForm() {
  const [status, setStatus] = useState('');
  const [isReady, setIsReady] = useState(false);

  // Keep the preview form from submitting through native GET before hydration
  // or when JavaScript is unavailable. No newsletter service is connected yet.
  useEffect(() => setIsReady(true), []);

  function handleSubmit(event) {
    event.preventDefault();
    // Connect the newsletter service here when signup functionality is ready.
    event.currentTarget.reset();
    setStatus('Signup is not active yet. Your email has not been sent or saved.');
  }

  return (
    <form className="footer-newsletter" aria-label="Newsletter signup" aria-describedby="footer-newsletter-notice" onSubmit={handleSubmit}>
      <label htmlFor="footer-newsletter-email">Stay up to date.</label>
      <div className="footer-newsletter-fields">
        <input id="footer-newsletter-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="Enter your email" required maxLength={254} disabled={!isReady} onChange={() => setStatus('')} />
        <button type="submit" disabled={!isReady}>Subscribe</button>
      </div>
      <p id="footer-newsletter-notice" className="footer-newsletter-notice">Signup is not active yet. This form does not send or save your email. <a href="/privacy#newsletter">Read our privacy notice</a>.</p>
      <p className="footer-newsletter-status" role="status">{status}</p>
    </form>
  );
}
