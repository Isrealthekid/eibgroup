import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import { privacyNotice, privacyContactHref } from '@/lib/privacy-notice';
import socialImage from '@/assets/contact/office-workspace.jpg';
import './privacy.css';

const pageUrl = 'https://www.eibgroup.com/privacy';
const title = 'Privacy & data handling — EIB Group';
const description = 'Read how the EIB Group website handles enquiries, newsletter information and technical data, and how to contact us about your privacy.';
const imageUrl = new URL(socialImage.src, 'https://www.eibgroup.com').href;

export const metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  robots: { index: !privacyNotice.isDraft, follow: true },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: 'EIB Group',
    type: 'website',
    locale: 'en_NG',
    images: [{ url: imageUrl, width: socialImage.width, height: socialImage.height, alt: 'An office workspace with people working at shared desks' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [imageUrl] },
};

const sections = [
  {
    id: 'scope',
    title: 'Who this notice covers',
    content: <>
      <p>This notice concerns the EIB Group corporate website. It describes the features available in this version and how to raise a privacy question. Subsidiaries and other websites linked from this site may have their own privacy notices.</p>
      <p>This website is operated by {privacyNotice.companyName}, based at {privacyNotice.businessAddress}. For privacy questions or requests, contact <a href={privacyContactHref}>{privacyNotice.contactEmail}</a>, the confirmed privacy contact for this website.</p>
    </>,
  },
  {
    id: 'enquiries',
    title: 'Information you share by email',
    content: <>
      <p>The Contact page provides email links. Opening one launches your email application; the website does not send a message on your behalf. If you choose to send an email, it may contain your name, email address, organisation, message and attachments.</p>
      <p>EIB Group manages its business mailboxes and handles the enquiries and related correspondence received through them. The email services involved process messages as part of delivery and storage. Please avoid sending identity documents, financial details, health information or other sensitive material in an initial enquiry.</p>
      <p>The specific lawful basis for handling enquiries, the underlying email service and the detailed arrangements for access to correspondence must be confirmed before this draft becomes a final notice.</p>
    </>,
  },
  {
    id: 'newsletter',
    title: 'Newsletter signup',
    content: <>
      <p>Newsletter signup is not active yet. The form currently lets you preview the interaction, but it does not send your email address to EIB Group, save it in the website’s storage or add you to a mailing list. A message on the form explains this when you use it.</p>
      <p>A newsletter provider has not yet been selected. Before signup is activated, this notice and the form will need to identify the service, explain how email addresses are used and provide the relevant subscription and unsubscribe choices.</p>
    </>,
  },
  {
    id: 'technical-data',
    title: 'Technical data, cookies and analytics',
    content: <>
      <p>Loading a website involves exchanging connection information, such as an IP address and browser request details, with its hosting service. The hosting provider may keep operational or security logs. The provider and its logging arrangements have not yet been confirmed for this notice.</p>
      <p>EIB Group has confirmed that this website does not use analytics, advertising pixels, tracking cookies or third-party content embeds. It does not use browser storage to remember newsletter entries. This does not establish what operational cookies or logs a hosting service, email provider or linked website may use.</p>
      <p>No automated decision-making or profiling feature is built into this website. If tracking or other data-processing features are added, the notice and any necessary visitor controls must be updated before they are enabled.</p>
    </>,
  },
  {
    id: 'providers',
    title: 'Service providers and external websites',
    content: <>
      <p>EIB Group manages its mailboxes, but the website hosting provider and the services supporting email delivery have not yet been specified for this notice. Their processing locations, access arrangements and any relevant international-transfer safeguards are still being confirmed. This draft does not claim that information is stored only in Nigeria.</p>
      <p>Company cards and social links take you to other websites. Those services receive the connection information needed to load their pages and may process information under their own notices. Review those notices before sharing personal information with them.</p>
    </>,
  },
  {
    id: 'retention',
    title: 'Retention and security',
    content: <>
      <p>The retention periods and deletion arrangements for enquiries, mailbox copies and hosting logs have not yet been confirmed. This notice will be updated with the applicable periods or criteria once they are established.</p>
      <p>The website does not maintain a newsletter database in its current form. Email and hosting services may hold separate records; their access controls, backup arrangements and security measures must be verified before specific assurances are included here.</p>
    </>,
  },
  {
    id: 'your-rights',
    title: 'Your privacy choices and rights',
    content: <>
      <p>Depending on the applicable law and circumstances, you may request access to your personal data, correction, deletion or restriction of processing; object to processing; request data portability; or withdraw consent where processing relies on it.</p>
      <p>For a question or request, email <a href={privacyContactHref}>{privacyNotice.contactEmail}</a> with the subject “Privacy enquiry” and enough information to explain your concern. Do not include unnecessary sensitive documents.</p>
      <p>You may also raise a concern with the <a href="https://ndpc.gov.ng/" target="_blank" rel="noopener noreferrer">Nigeria Data Protection Commission <span aria-hidden="true">↗</span></a>. The availability of a right can depend on the circumstances and applicable legal requirements.</p>
    </>,
  },
  {
    id: 'updates',
    title: 'Updates to this notice',
    content: <>
      <p>This is a draft notice, reviewed on <time dateTime={privacyNotice.lastUpdated}>24 October 2026</time>. It will need to be finalised when the outstanding business and provider details are confirmed, and reviewed again before new forms, analytics or marketing services begin collecting information.</p>
      <p>The notice’s structure and rights summary were informed by the <a href="https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf" target="_blank" rel="noopener noreferrer">Nigeria Data Protection Act 2023</a> and the Commission’s <a href="https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf" target="_blank" rel="noopener noreferrer">2025 implementation directive</a>. This draft does not claim that the organisation’s operational compliance has been verified.</p>
    </>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#privacy-content">Skip to privacy notice</a>
      <SiteNavigation isHome={false} currentPage="privacy" />
      <main id="privacy-content" className="privacy-page" tabIndex={-1}>
        <header className="privacy-heading">
          <p className="privacy-eyebrow">EIB GROUP · PRIVACY NOTICE</p>
          <h1>Privacy &amp;<br />data handling.</h1>
          <p className="privacy-introduction">Understand what you share, how this website works and where to turn with a privacy question.</p>
          <p className="privacy-updated">Draft notice · Reviewed <time dateTime={privacyNotice.lastUpdated}>24 October 2026</time></p>
        </header>
        <aside className="privacy-review-note" aria-labelledby="privacy-review-title">
          <h2 id="privacy-review-title">Details under review</h2>
          <p>The company details and privacy contact below are confirmed. Hosting and email service details, lawful bases and retention arrangements are still being confirmed. This draft will be finalised when those remaining details are verified.</p>
        </aside>
        <div className="privacy-layout">
          <nav className="privacy-contents" aria-labelledby="privacy-contents-title">
            <h2 id="privacy-contents-title">In this notice</h2>
            <ul>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ul>
          </nav>
          <div className="privacy-sections">
            {sections.map(section => (
              <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.content}
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter isHome={false} currentPage="privacy" />
    </>
  );
}
