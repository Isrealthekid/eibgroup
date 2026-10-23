# Privacy notice review

Prepared on 24 October 2026 for the current EIB Group redesign.

## Implemented

- `/privacy` describes the current website and provides a clear draft notice.
- Privacy requests use `info@eibstratoc.com`, supplied by the user for this purpose. No claim is made that this is a designated Data Protection Officer or that mailbox monitoring has been verified.
- Existing marketing and business enquiry addresses are unchanged.
- Footer, contact and newsletter links point to the notice.
- The newsletter remains a preview; it does not submit or store addresses. Inputs and the submit button are disabled before hydration and when JavaScript is off to prevent native query-string submission.
- No advertising/analytics code, tracking storage or automated decision-making feature was identified in this version of the frontend. This is not a verification of production hosting, mailbox or other provider practices.

## Confirm before finalising

- [ ] Registered data-controller name, business address and any representative details.
- [ ] Responsibility for the user-supplied privacy inbox, including request routing and responses.
- [ ] Actual purposes and specific lawful bases for email correspondence and operational logs.
- [ ] Hosting, email and other providers; types of records, recipient access and processing locations.
- [ ] Retention periods or defensible criteria for enquiries, backups and logs, plus deletion arrangements.
- [ ] Actual technical/organisational security measures and access controls; avoid guarantees of absolute security.
- [ ] Any international-transfer arrangements and applicable safeguards.
- [ ] Whether production adds cookies, analytics or embedded third-party services absent from this repository. Add appropriate choices before enabling any processing that needs them.
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
