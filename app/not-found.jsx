import BrandLogo from '@/components/brand-logo';
import './not-found.css';

export const metadata = { title: 'Page not found — EIB Group' };

export default function NotFound() {
  return (
    <main className="not-found">
      <a className="not-found-brand" href="/" aria-label="EIB Group home">
        <BrandLogo className="not-found-logo" />
      </a>
      <div className="not-found-content">
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1>Page not found.</h1>
        <p className="not-found-description">The page you’re looking for may have moved or no longer exists.</p>
        <a className="not-found-home" href="/">Back to home <span aria-hidden="true">↗</span></a>
      </div>
    </main>
  );
}
