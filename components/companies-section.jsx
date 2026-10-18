import briechUasLogo from '@/assets/companies/briech-uas.png';
import eibStratocLogo from '@/assets/companies/eib-stratoc.png';
import luftLogo from '@/assets/companies/luft.png';
import briechAtlanticLogo from '@/assets/companies/briech-atlantic.png';
import luftreiberLogo from '@/assets/companies/luftreiber.png';
import gigaForensicsLogo from '@/assets/companies/giga-forensics.png';
import brightFmLogo from '@/assets/companies/bright-fm.png';
import poctovaLogo from '@/assets/companies/poctova.png';
import foundationLogo from '@/assets/companies/foundation.png';

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
};

// Official logos are stored locally in assets/companies and bundled by Next.js.
const companies = [
  { name: 'Briech UAS', sector: 'Unmanned aerial systems', logo: 'briech-uas', width: 497, height: 131 },
  { name: 'EIB Stratoc', sector: 'Security & defence', logo: 'eib-stratoc', width: 460, height: 225 },
  { name: 'Luft', sector: 'Television & entertainment', logo: 'luft', width: 2737, height: 1224 },
  { name: 'Briech Atlantic', sector: 'Construction & infrastructure', logo: 'briech-atlantic', width: 3241, height: 1065 },
  { name: 'Luftreiber Automobile', sector: 'Automotive & mobility', logo: 'luftreiber', width: 3211, height: 1155 },
  { name: 'Giga Forensics', sector: 'Digital forensics', logo: 'giga-forensics', width: 3125, height: 1875, viewBox: '104 725 2917 426' },
  { name: 'Bright FM', sector: 'Radio & communications', logo: 'bright-fm', width: 1807, height: 833 },
  { name: 'Poctova', sector: 'Clothing & textiles', logo: 'poctova', width: 3125, height: 1875, viewBox: '666 42 1793 1792', badge: true },
  { name: 'Bright Echefu Foundation', sector: 'Community & social impact', logo: 'foundation', width: 194, height: 194, badge: true },
];

export default function CompaniesSection() {
  return (
    <section id="companies" className="companies" aria-labelledby="companies-title">
      <div className="companies-content">
        <h2 id="companies-title">Our companies.</h2>
        <ul className="companies-grid">
          {companies.map(company => (
            <li className="company-card" key={company.name}>
              <svg className={`company-logo company-logo-${company.logo}${company.badge ? ' company-logo-badge' : ''}`} viewBox={company.viewBox || `0 0 ${company.width} ${company.height}`} role="img" aria-label={`${company.name} logo`}>
                <image href={logos[company.logo].src} width={company.width} height={company.height} />
              </svg>
              <p className="company-sector">{company.sector}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
