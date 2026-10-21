import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import './team.css';

export const metadata = {
  title: 'Our team — EIB Group',
  description: 'Meet the team behind EIB Group.',
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

export default function OurTeamPage() {
  return (
    <>
      <a className="skip-link" href="#team-content">Skip to our team</a>
      <SiteNavigation isHome={false} currentPage="team" />
      <main id="team-content" className="team-page" tabIndex={-1}>
        <header className="team-heading">
          <h1 className="team-title">Our team</h1>
          <p className="team-introduction">Leadership across every part of our group.</p>
          <p className="team-preview-note">Names and portraits are placeholders.</p>
        </header>
        <ul className="team-grid" aria-label="Our team profiles">
          {team.map(member => (
            <li className="team-member" key={member.role}>
              <div className="team-portrait" aria-hidden="true">
                <svg className="company-border" focusable="false">
                  <rect x="1" y="1" pathLength="100" />
                </svg>
              </div>
              <h2 className="team-name">{member.name}</h2>
              <p className="team-role">{member.role}</p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter isHome={false} currentPage="team" />
    </>
  );
}
