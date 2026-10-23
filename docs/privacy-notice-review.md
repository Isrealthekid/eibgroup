# Privacy notice review

Prepared on 24 October 2026 for the current EIB Group redesign.

## Implemented

- `/privacy` describes the current website and provides a clear draft notice.
- The user confirmed the company name as EIB Group and the business address as Idu Industrial Area, Abuja, Nigeria. No registration suffix or company number has been invented.
- Privacy requests use `info@eibstratoc.com`, explicitly confirmed by the user for this purpose. No claim is made that this is a designated Data Protection Officer.
- The user confirmed that the company manages its business mailboxes and handles enquiries. This establishes operational responsibility, not the identity of an underlying hosting or email service provider, individual access roles or a retention period.
- Existing marketing and business enquiry addresses are unchanged.
- Footer, contact and newsletter links point to the notice.
- The newsletter remains a preview; it does not submit or store addresses. Inputs and the submit button are disabled before hydration and when JavaScript is off to prevent native query-string submission.
- The user confirmed no analytics, advertising pixels, tracking cookies or third-party content embeds are in use. No tracking storage or automated decision-making feature was identified in this version of the frontend. Hosting logs and provider infrastructure still need confirmation.
- A newsletter provider has not been decided; signup remains inactive.

## Confirm before finalising

- [x] Company name and business address supplied by the user: EIB Group, Idu Industrial Area, Abuja, Nigeria.
- [x] Privacy contact and company responsibility confirmed by the user. Detailed request routing/handling remains covered by the procedure check below.
- [ ] Actual purposes and specific lawful bases for email correspondence and operational logs.
- [ ] Hosting, email and other providers; types of records, recipient access and processing locations.
- [ ] Retention periods or defensible criteria for enquiries, backups and logs, plus deletion arrangements.
- [ ] Actual technical/organisational security measures and access controls; avoid guarantees of absolute security.
- [ ] Any international-transfer arrangements and applicable safeguards.
- [x] User confirms no analytics, tracking cookies, advertising pixels or third-party content embeds are active. Check the actual hosting provider's operational cookies/logs and recheck before adding new services.
- [ ] Working privacy request procedure and accurate rights/complaints information.
- [ ] Appropriate organisational review of the completed notice against actual operations and applicable law.

When confirmed, revise the page's draft wording, update the review date and set `privacyNotice.isDraft` to `false` in `lib/privacy-notice.js`. That enables indexing and includes the page in the generated sitemap. Check the exported metadata and the actual deployed site; a Git push alone does not publish to the production domain.

## Before enabling newsletter collection

- Select and verify the service, purpose, recipients and retention.
- Replace the preview-only handler with the real delivery workflow.
- Add the relevant affirmative subscription choice and a working unsubscribe mechanism; do not treat reading the notice or visiting the website as consent.
- Update the inline notice and privacy page together. Do not retain the statement that emails are not sent once collection is enabled.
- Verify success/error handling and confirm that addresses cannot leak through query strings or unrelated tracking.

## Primary sources reviewed

- Nigeria Data Protection Act 2023, particularly sections 27 (notice information), 34–38 (individual rights), and 41–43 (international transfers): https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf
- NDPC General Application and Implementation Directive 2025, particularly articles 19 (cookies/tracking) and 27 (information to data subjects): https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf

Both official PDFs were retrieved and read during implementation. Their requirements inform the draft and checklist; no unverified claim of organisational compliance is made.
