import briechUasLogo from '@/assets/companies/briech-uas.png';
import eibStratocLogo from '@/assets/companies/eib-stratoc.png';
import luftLogo from '@/assets/companies/luft.png';
import briechAtlanticLogo from '@/assets/companies/briech-atlantic.png';
import luftreiberLogo from '@/assets/companies/luftreiber.png';
import gigaForensicsLogo from '@/assets/companies/giga-forensics.png';
import brightFmLogo from '@/assets/companies/bright-fm.png';
import poctovaLogo from '@/assets/companies/poctova.png';
import foundationLogo from '@/assets/companies/foundation.png';
import briechHospitalLogo from '@/assets/companies/Briech Hospital png.png';

const logos = {
  'briech-uas': briechUasLogo,
  'eib-stratoc': eibStratocLogo,
  luft: luftLogo,
  'briech-atlantic': briechAtlanticLogo,
  luftreiber: luftreiberLogo,
  'giga-forensics': gigaForensicsLogo,
  'bright-fm': brightFmLogo,
  poctova: poctovaLogo,
  foundation: foundationLogo,
  'briech-hospital': briechHospitalLogo,
};

// Official logos are stored locally in assets/companies and bundled by Next.js.
const companies = [
  { name: 'Briech UAS', description: 'Drone systems for defence, agriculture and commercial operations.', website: 'https://www.briechuas.com/', logo: 'briech-uas', width: 497, height: 131, accent: '#ab7c3f' },
  { name: 'EIB Stratoc', description: 'Combining defence technology and strategic insight to strengthen security.', website: 'https://www.eibstratoc.com/', logo: 'eib-stratoc', width: 460, height: 225, accent: '#264b8f' },
  { name: 'Luft', description: 'Premium pay TV bringing entertainment within reach of more households.', website: 'https://lufttv.com/', logo: 'luft', width: 2737, height: 1224, accent: '#1357c5' },
  { name: 'Briech Atlantic', description: 'Creating durable buildings and infrastructure for a changing Nigeria.', website: 'https://www.briechatlantic.com/', logo: 'briech-atlantic', width: 3241, height: 1065, accent: '#f80101' },
  // These three .com destinations were supplied as name-based URLs by the site owner.
  { name: 'Luftreiber Automobile', description: 'Automotive care and mobility services for the African market.', website: 'https://luftreiberautomobile.com/', logo: 'luftreiber', width: 3211, height: 1155, accent: '#f53e3a' },
  { name: 'Giga Forensics', description: 'Investigating digital evidence and defending essential systems from cyber threats.', website: 'https://gigaforensics.com/', logo: 'giga-forensics', width: 3125, height: 1875, viewBox: '104 725 2917 426', accent: '#5bc3e7' },
  { name: 'Bright FM', description: 'News, music and conversation from Abuja’s 98.7 FM.', website: 'https://www.brightfm.com.ng/', logo: 'bright-fm', width: 1807, height: 833, accent: '#f8cd0d' },
  { name: 'Poctova', description: 'Uniforms, tactical apparel and protective gear for defence and security teams.', website: 'https://www.poctova.com/', logo: 'poctova', width: 3125, height: 1875, viewBox: '666 42 1793 1792', badge: true, accent: '#006a8e' },
  { name: 'Bright Echefu Foundation', description: 'Helping communities thrive through learning, healthcare access and practical skills.', website: 'https://www.brightechefufoundation.org/', logo: 'foundation', width: 194, height: 194, badge: true, accent: '#e4002b' },
  { name: 'Briech Hospital', description: 'Advancing EIB Group’s commitment to healthcare.', website: 'https://briechhospital.com/', logo: 'briech-hospital', width: 2239, height: 377, accent: '#001971' },
];

export default function CompaniesSection() {
  return (
    <section id="companies" className="companies" aria-labelledby="companies-title">
      <div className="companies-content">
        <h2 id="companies-title" className="section-heading">Our companies</h2>
        <ul className="companies-grid">
          {companies.map(company => (
            <li className="company-card" key={company.name} style={{ '--company-accent': company.accent }}>
              {company.website && (
                <a className="company-link" href={company.website} target="_blank" rel="noopener noreferrer" aria-label={`${company.name} website (opens in a new tab)`} aria-describedby={`company-description-${company.logo}`} />
              )}
              <svg className="company-border" aria-hidden="true" focusable="false">
                <rect x="1" y="1" pathLength="100" />
              </svg>
              <div className="company-identity">
                <svg className={`company-logo company-logo-${company.logo}${company.badge ? ' company-logo-badge' : ''}`} viewBox={company.viewBox || `0 0 ${company.width} ${company.height}`} role="img" aria-label={company.name} aria-hidden={company.website ? true : undefined}>
                  <image href={logos[company.logo].src} width={company.width} height={company.height} />
                </svg>
              </div>
              <p className="company-copy" id={`company-description-${company.logo}`}>{company.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
