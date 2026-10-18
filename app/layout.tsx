import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'ProjectSpace — Student Project Showcase & Digital Exhibition',
  description: 'A digital exhibition platform celebrating student technical innovation, creative engineering, and research projects. Great ideas deserve to be seen.',
  openGraph: {
    title: 'ProjectSpace — Student Project Showcase',
    description: 'A digital exhibition platform celebrating student technical innovation, creative engineering, and research projects.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProjectSpace — Student Project Showcase',
    description: 'A digital exhibition platform celebrating student technical innovation, creative engineering, and research projects.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-[#FAFDFE] text-[#152238] antialiased selection:bg-[#EAF4FF] selection:text-[#152238] min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

