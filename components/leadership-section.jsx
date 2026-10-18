import portrait from '@/assets/leadership/dr-bright-echefu.png';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="leadership" aria-labelledby="leadership-title">
      <div className="leadership-grid">
        <div className="leadership-content">
          <div className="leadership-heading">
            <p className="leadership-label">Leadership</p>
            <h2 id="leadership-title">Dr. Bright Echefu</h2>
            <p className="leadership-role">Chairman &amp; Chief Executive Officer</p>
          </div>
          <div className="leadership-copy">
            <p className="leadership-introduction">Dr. Bright Echefu leads EIB Group’s vision for innovation and long-term growth across technology, media and healthcare.</p>
            <div className="leadership-biography">
              <p>With more than 15 years of experience, he combines strategic insight with a practical approach to building businesses. His leadership focuses on developing African talent, advancing local capabilities and delivering solutions that create lasting economic and social value.</p>
              <p>Through investment in people and enduring partnerships, Dr. Echefu is shaping a diversified group grounded in excellence, integrity and social responsibility, with a commitment to sustainable growth across Africa.</p>
            </div>
          </div>
        </div>
        <figure className="leadership-portrait">
          <img src={portrait.src} width={portrait.width} height={portrait.height} alt="Dr. Bright Echefu, Chairman and Chief Executive Officer of EIB Group" loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  );
}
