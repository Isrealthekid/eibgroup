import { privacyNotice } from '@/lib/privacy-notice';

export const dynamic = 'force-static';

export default function sitemap() {
  const paths = ['/', '/about', '/contact'];
  if (!privacyNotice.isDraft) paths.push('/privacy');
  return paths.map(path => ({ url: `https://www.eibgroup.com${path}` }));
}
