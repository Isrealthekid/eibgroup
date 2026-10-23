# Website audit and ongoing requirements

Recorded on 24 October 2026. The user asked that the audit guide future page work and that all pages be SEO friendly.

Source: the Marketing and Sales Department's consolidated website audit, supplied as `D:/EIB GROUP WEBSITE AUDIT (1).pdf` (29 pages). This document summarises its recommendations; the original attachment remains the reference. Recommendations do not override direct user instructions or authorize changes to other repositories, publication, or contact with third parties.

## How to use this checklist

- Apply the appropriate brand checklist when working on that brand. Subsidiary findings below are audit findings, not fresh assessments of their current websites.
- Recheck relevant functionality and record progress when implementing changes. This is a dated baseline, not proof of present deployment status.
- Distinguish unfinished features requested by the user from regressions or broken interactions.
- Use confirmed facts and approved content. Never fabricate evidence, credentials, contacts, metrics or product specifications to close an audit item.

## EIB Group baseline

Audit-specific findings are on pages 3–5; shared recommendations are on pages 25–27.

Addressed in the redesign as of this date:

- Placeholder phone removed; the two user-provided emails are displayed.
- Homepage, `/about` and `/contact` provide separate entry points. About includes vision, mission and executive leadership; the former standalone team page has been merged into it.
- Subsidiary cards are clickable external links with descriptions and local logo assets. The audit explicitly accepts external websites; internal subsidiary profiles are not required simply to satisfy clickability.
- The raw MP4 hero has been replaced with the globe and circle animation. This removes the audited video issue but does not establish a performance score for the replacement.
- The unsupported impact/uptime figures were removed. Current counts describe industry pillars and companies rather than unsupported service guarantees.
- Repeated generic partnership buttons were removed, but audience-specific conversion paths still need work.

Remaining work:

- Configure complete Open Graph/social preview metadata with production URLs and suitable images. Titles and descriptions alone are insufficient.
- Develop clear enquiry paths and appropriate calls to action for clients, partners and applicants where supported by real business processes.
- Add useful subsidiary detail and credible evidence such as approved projects, case studies and testimonials.
- Replace dummy executive names and blank portraits with approved profiles.
- Add accurate privacy and data-handling information and relevant links.
- Replace inactive social placeholders when official profiles are supplied. LinkedIn is active; Instagram, Facebook and X are intentionally disabled at the user's request.
- Connect newsletter collection when the user is ready. The current form intentionally does not store or transmit submissions and must not claim that subscription succeeded.
- Verify destination URLs for subsidiaries, especially name-based URLs supplied before verification.

The public `eibgroup.com` domain still served the older site on 24 October 2026; direct checks of `/about` and `/contact` returned 404. Its homepage still included localhost social-preview images, placeholder social links, a generic phone number and unsupported figures. Its MP4 already had a poster, so the audit's claim that no poster existed was not fully current. Check deployment separately from GitHub status.

## EIB Stratoc (audit pages 6–9)

- Replace the emergency phone placeholder with a verified monitored line; enable useful tap-to-call behaviour when a real number exists.
- Use clear procurement-oriented CTA and form labels, with consistent wording across pages.
- Replace absolute security guarantees with evidence-backed claims; do not copy the audit's alternative metrics without verification.
- Store imagery locally or on an approved asset service; avoid reliance on another site's image paths.
- Use relevant, distinct images for projects and news rather than recycling unrelated imagery.
- Consolidate overlapping About, Vision and Mission material into clear company subsections.
- Present verified credentials or an accurate explanation of data-handling practices.

## Giga Forensics (audit pages 10–13)

- Replace placeholder contact information.
- Add structured enquiry capture, with organisation, country and capability of interest where appropriate; connect a real delivery workflow.
- Develop substantive, indexable capability and department pages instead of a single flat page.
- Add approved leadership bios, anonymised case studies and verified credentials.
- Add privacy and data-handling information.
- Provide contextual contact actions and separate entry paths for relevant audiences, such as government and telecoms.

## Poctova (audit pages 14–17)

- Provide product photography, specifications and clear purchase or quotation paths.
- Separate institutional procurement and civilian shopping journeys.
- Add relevant product galleries, sizing information and structured RFQ capture, including quantities and specifications.
- Expand the brand story, EIB relationship, manufacturing process and quality assurance information using verified material.
- Support claims with approved customer evidence and genuine product certifications. Do not invent certification badges.
- Develop substantive product and supporting content pages rather than adding empty pages for search engines.

## Briech UAS (audit pages 18–20)

- Fix broken specification destinations or remove the links until actual specifications are available.
- Add meaningful sales actions on product pages, such as a quote enquiry, demonstration or site visit, when the business can fulfil them.
- Do not let newsletter signup substitute for the principal product enquiry path.
- Use product-appropriate imagery and a clear technical presentation without sacrificing legibility or usability.
- Improve substantive product content, search metadata and valid structured data.

## Luftreiber Automobile (audit pages 21–23)

- Make the service site and parts store feel connected, including shared navigation and clear cross-links.
- Lead with services, location and a useful booking action rather than internal mission statements.
- Present real credentials, approved reviews, service history and before/after examples where available.
- Create substantive pages for important services, with relevant contact or booking paths.

## SEO requirements for every new or revised page

- Use a descriptive, unique title and meta description that match the visible content and visitor intent.
- Use the confirmed production origin for canonical URLs and social metadata. Never ship localhost references in public metadata.
- Configure appropriate Open Graph/social preview images and descriptions; verify the exported HTML.
- Keep important content available in initial rendered HTML, with one clear H1 and logical heading levels, descriptive links and semantic landmarks.
- Make intended public pages crawlable and discoverable through internal links and suitable sitemap/robots configuration. Check status codes and avoid dead-end or placeholder destinations.
- Use structured data only when the schema fits the page and all claims are accurate. Do not invent reviews, ratings, certifications or organisation details.
- Use informative image alternative text, declared dimensions, suitable formats and sensible loading behaviour. Avoid unnecessary media downloads and layout shifts.
- Preserve keyboard access, readable contrast, mobile layouts and reduced-motion support. Test real navigation between pages and anchors.
- Link relevant company, industry and contact material naturally. Prefer useful original content to keyword repetition or thin duplicate pages.
- Check performance and mobile behaviour for meaningful new media or interactions. Do not claim speed, ranking or rich-result guarantees without evidence.
- Before publication, verify the actual deployed URLs, metadata, social previews and form delivery. Git pushes and local builds do not establish production readiness.

## Privacy and data-handling readiness

Technical scope that can be implemented here: draft a plain-language privacy notice, create its page, add appropriate links, explain form use near collection points, and implement agreed consent or preference controls where needed.

Base all copy on confirmed facts. Before finalising it, establish:

- The responsible legal entity, business contact details and privacy contact.
- What information the site, hosting provider, email inboxes and any active forms actually process, and for which purposes.
- Which analytics, cookies, newsletter, hosting and other service providers are actually used.
- Where submissions are delivered, who can access them, and the actual retention/deletion arrangements.
- Applicable rights-request handling and any relevant international processing arrangements.
- Any consent or preference mechanism required by the actual implementation and applicable rules.

Current code provides mailto contact links and a frontend-only newsletter form; the newsletter does not yet save or send email addresses. Hosting logs and email-provider processing cannot be ruled out just because the frontend contains no analytics code. Do not claim that no personal data or cookies are processed without checking the services involved.

Verify applicable primary legal sources when drafting the policy. Separate a draft from confirmed operational facts; do not represent generated wording as a guarantee of legal compliance.
