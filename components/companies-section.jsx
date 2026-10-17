// Names and sectors follow the subsidiary network on eibgroup.com.
const companies = [
  { name: 'Briech UAS', sector: 'Unmanned aerial systems' },
  { name: 'EIB Stratoc', sector: 'Security & defence technology' },
  { name: 'Luft', sector: 'Television & entertainment' },
  { name: 'Briech Atlantic', sector: 'Construction & infrastructure' },
  { name: 'Luftreiber Automobile', sector: 'Automotive & mobility' },
  { name: 'Giga Forensics', sector: 'Digital forensics & cybersecurity' },
  { name: 'Bright FM', sector: 'Radio & communications' },
  { name: 'Poctova', sector: 'Clothing & textiles' },
  { name: 'Bright Echefu Foundation', sector: 'Community & social impact' },
];

export default function CompaniesSection() {
  return (
    <section id="companies" className="companies" aria-labelledby="companies-title">
      <div className="companies-content">
        <h2 id="companies-title">Our companies.</h2>
        <ul className="companies-grid">
          {companies.map(company => (
            <li className="company-card" key={company.name}>
              <h3>{company.name}</h3>
              <p>{company.sector}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
