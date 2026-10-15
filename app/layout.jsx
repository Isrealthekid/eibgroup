import './globals.css';

export const metadata = {
  title: 'EIB Group — Engineering Tomorrow',
  description: 'EIB Group. Engineering tomorrow. Empowering Africa. Discover a world of possibility.',
};

export const viewport = { themeColor: '#0d0d0f' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
