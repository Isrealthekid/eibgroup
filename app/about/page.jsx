import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import './about.css';

export const metadata = {
  title: 'About — EIB Group',
  description: 'Discover EIB Group, our vision, our mission and the executive leadership behind our businesses.',
};

// Replace the sample names and portrait placeholders when profiles are supplied.
const team = [
  { name: 'Alex Morgan', role: 'Chairman' },
  { name: 'Jordan Ellis', role: 'Executive VP' },
  { name: 'Taylor Reed', role: 'ED, Finance' },
  { name: 'Cameron Brooks', role: 'CTO' },
  { name: 'Avery Clarke', role: 'COO' },
  { name: 'Riley James', role: 'Head of HR' },
  { name: 'Casey Quinn', role: 'Head of Corporate Affairs' },
  { name: 'Morgan Hayes', role: 'Director of Strategy' },
  { name: 'Jamie Parker', role: 'Head of Legal & Compliance' },
];

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#about-content">Skip to about EIB Group</a>
      <SiteNavigation isHome={false} currentPage="about" />
      <main id="about-content" className="about-page" tabIndex={-1}>
        <header className="about-introduction">
          <h1 className="about-title">About EIB Group.</h1>
          <div className="about-overview">
            <p className="about-lead">Progress across industries.<br /><span>Opportunity across Africa.</span></p>
            <div className="about-copy">
              <p>EIB Group brings together businesses across security, communications, fashion, infrastructure and healthcare. We connect expertise and investment to develop practical solutions for the markets and communities we serve.</p>
              <p>Our companies share a commitment to innovation, responsible growth and lasting value. Together, we invest in people, build partnerships and create opportunities for Africa’s future.</p>
            </div>
          </div>
          <nav className="about-section-links" aria-label="On this page">
            <a href="#vision">Our vision <span aria-hidden="true">↘</span></a>
            <a href="#mission">Our mission <span aria-hidden="true">↘</span></a>
            <a href="#executive-leadership">Executive leadership <span aria-hidden="true">↘</span></a>
          </nav>
        </header>
        <div className="about-purpose" data-navigation-tone="dark">
          <section id="vision" aria-labelledby="vision-title">
            <h2 id="vision-title" className="section-heading">Our vision.</h2>
            <p>To build a diversified African business group that advances innovation, expands opportunity and creates lasting value for communities.</p>
          </section>
          <section id="mission" aria-labelledby="mission-title">
            <h2 id="mission-title" className="section-heading">Our mission.</h2>
            <p>To grow businesses that solve real needs through investment in people, technology and partnerships, delivering reliable services and responsible growth across the industries we serve.</p>
          </section>
        </div>
        <section id="executive-leadership" className="about-team" aria-labelledby="executive-leadership-title">
          <header className="team-heading">
            <h2 id="executive-leadership-title" className="section-heading">Executive leadership.</h2>
            <p className="team-introduction">Guiding our businesses. Shaping our shared future.</p>
            <p className="team-preview-note">Names and portraits are placeholders.</p>
          </header>
          <ul className="team-grid" aria-label="Executive leadership profiles">
            {team.map(member => (
              <li className="team-member" key={member.role}>
                <div className="team-portrait" aria-hidden="true">
                  <svg className="company-border" focusable="false">
                    <rect x="1" y="1" pathLength="100" />
                  </svg>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter isHome={false} currentPage="about" />
    </>
  );
}
