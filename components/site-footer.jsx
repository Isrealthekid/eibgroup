import logo from '@/assets/eib red.png';
import NewsletterForm from '@/components/newsletter-form';

const linkedInUrl = 'https://www.linkedin.com/company/eib-group-africa/posts/?feedView=all';
// Add the official profile URLs here when available; empty values show an icon only.
const socials = [
  { name: 'LinkedIn', icon: 'linkedin', href: linkedInUrl },
  { name: 'Instagram', icon: 'instagram', href: '' },
  { name: 'Facebook', icon: 'facebook', href: '' },
  { name: 'X', icon: 'x', href: '' },
];

function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === 'linkedin' && <path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8v-4.64c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.72H9.51V9.2h2.83v1.3h.04c.39-.74 1.35-1.52 2.79-1.52 2.99 0 3.55 1.97 3.55 4.53v5.24Z" />}
      {name === 'instagram' && <g fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></g>}
      {name === 'facebook' && <path fill="currentColor" d="M14 22v-9h3l.5-4H14V6.5c0-1.1.3-1.8 1.8-1.8H18V1.2c-.4-.1-1.7-.2-3.2-.2C11.6 1 9.5 3 9.5 6.6V9H6v4h3.5v9H14Z" />}
      {name === 'x' && <path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 15.6 6.4 22H3.2l7.3-8.4L.8 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />}
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer" aria-label="EIB Group contact and links">
      <div className="footer-panel">
        <div className="footer-banner">
          <div>
            <h2 className="footer-banner-title">Stay connected<br />with EIB Group.</h2>
            <p className="footer-banner-description">Receive news and updates from across our companies.</p>
          </div>
          <NewsletterForm />
        </div>
        <div className="footer-columns">
          <div className="footer-identity">
            <a href="#home" className="footer-brand" aria-label="EIB Group home">
              <svg viewBox="15 22 1180 176" aria-hidden="true" focusable="false"><image href={logo.src} width="1208" height="228" /></svg>
            </a>
            <p className="footer-tagline">A world of possibility.</p>
            <div className="footer-socials" aria-label="EIB Group social profiles">
              {socials.map(social => social.href ? (
                <a key={social.icon} className="footer-social-icon" href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`EIB Group on ${social.name} (opens in a new tab)`}><SocialIcon name={social.icon} /></a>
              ) : (
                <span key={social.icon} className="footer-social-icon is-placeholder" role="img" aria-label={`${social.name} (profile link to be added)`} title={`${social.name} link to be added`}><SocialIcon name={social.icon} /></span>
              ))}
            </div>
          </div>
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
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} EIB Group</p></div>
      </div>
    </footer>
  );
}
