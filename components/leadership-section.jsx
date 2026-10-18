import portrait from '@/assets/leadership/dr-bright-echefu.png';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="leadership" aria-labelledby="leadership-title">
      <div className="leadership-grid">
        <figure className="leadership-portrait">
          <img src={portrait.src} width={portrait.width} height={portrait.height} alt="Dr. Bright Echefu, Chairman and Chief Executive Officer of EIB Group" loading="lazy" decoding="async" />
        </figure>
        <div className="leadership-content">
          <div className="leadership-copy">
            <h2 id="leadership-title" className="section-heading"><span>Leadership with vision.</span><br />Impact across Africa.</h2>
            <h3 className="leadership-name">Dr. Bright Echefu</h3>
            <p className="leadership-role">Chairman &amp; Chief Executive Officer</p>
            <p className="leadership-biography">With more than 15 years of experience across technology, media and healthcare, Dr. Echefu leads EIB Group with a focus on developing African talent, building enduring partnerships and creating lasting economic and social value.</p>
          </div>
          <dl className="leadership-metrics" aria-label="EIB Group impact">
            <div><dt>Industry pillars</dt><dd>4</dd></div>
            <div><dt>Companies</dt><dd>10</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
