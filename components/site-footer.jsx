import BrandLogo from '@/components/brand-logo';

const linkedInUrl = 'https://www.linkedin.com/company/eib-group-africa/posts/?feedView=all';

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8v-4.64c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.72H9.51V9.2h2.83v1.3h.04c.39-.74 1.35-1.52 2.79-1.52 2.99 0 3.55 1.97 3.55 4.53v5.24Z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer" aria-label="EIB Group contact and links">
      <div className="footer-panel">
        <div className="footer-columns">
          <nav className="footer-column footer-links" aria-labelledby="footer-links-title">
            <h2 id="footer-links-title" className="footer-heading">Quick links</h2>
            <a href="#about">About</a>
            <a href="#leadership">Leadership</a>
            <a href="#companies">Our companies</a>
            <a href="https://www.brightechefufoundation.org" target="_blank" rel="noopener noreferrer">Our foundation <span aria-hidden="true">↗</span></a>
          </nav>
          <div className="footer-column footer-contact">
            <h2 className="footer-heading">Contact</h2>
            <a href="mailto:eibgroupmarketing@gmail.com">eibgroupmarketing@gmail.com</a>
            <a href="mailto:marketing@eibgroup.com">marketing@eibgroup.com</a>
          </div>
          <div className="footer-column footer-social">
            <h2 className="footer-heading">Social</h2>
            <a className="footer-social-card" href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="Connect with EIB Group on LinkedIn (opens in a new tab)">
              <span className="footer-social-card-top"><LinkedInIcon /><span>EIB Group</span><span className="footer-social-arrow" aria-hidden="true">↗</span></span>
              <span className="footer-social-description">Connect with us on LinkedIn.</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            <a href="#home" className="footer-brand" aria-label="EIB Group home"><BrandLogo /></a>
            <p>© {new Date().getFullYear()} EIB Group</p>
          </div>
          <a className="footer-social-icon" href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="EIB Group on LinkedIn (opens in a new tab)"><LinkedInIcon /></a>
        </div>
      </div>
    </footer>
  );
}
