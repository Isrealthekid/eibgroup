import Image from 'next/image';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import { contactEmails, socialProfiles } from '@/lib/site-contact';
import officeImage from '@/assets/contact/office-workspace.jpg';
import './contact.css';

export const metadata = {
  title: 'Contact — EIB Group',
  description: 'Contact EIB Group to discuss business opportunities, partnerships and marketing enquiries.',
};

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#contact-content">Skip to contact details</a>
      <SiteNavigation isHome={false} currentPage="contact" />
      <main id="contact-content" className="contact-page" tabIndex={-1}>
        <section className="contact-introduction" aria-labelledby="contact-title">
          <div className="contact-heading">
            <h1 id="contact-title">Let’s talk.</h1>
            <p>Connect with our team to explore partnerships, discuss business opportunities or learn more about the companies shaping EIB Group.</p>
          </div>
          <div className="contact-details">
            <dl className="contact-emails">
              {contactEmails.map(email => (
                <div key={email.address}>
                  <dt>{email.label}</dt>
                  <dd><a href={`mailto:${email.address}`}>{email.address}</a></dd>
                </div>
              ))}
            </dl>
            <nav className="contact-socials" aria-labelledby="contact-socials-title">
              <h2 id="contact-socials-title">Follow EIB Group</h2>
              <ul>
                {socialProfiles.map(social => (
                  <li key={social.icon}>
                    {social.href ? (
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`EIB Group on ${social.name} (opens in a new tab)`}>{social.name} <span aria-hidden="true">↗</span></a>
                    ) : (
                      <span className="contact-social-unavailable" aria-disabled="true" title={`${social.name} profile not yet available`}>{social.name}<span className="contact-sr-only"> — profile not yet available</span></span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
        <div className="contact-image" data-navigation-tone="dark">
          <Image src={officeImage} alt="A collaborative workspace with people working at shared desks" sizes="100vw" priority />
        </div>
      </main>
      <SiteFooter isHome={false} currentPage="contact" />
    </>
  );
}
