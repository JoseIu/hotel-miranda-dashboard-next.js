import 'cal-sans';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './global.scss';

// const geistSans = localFont({
// 	src: "./fonts/GeistVF.woff",
// 	variable: "--font-geist-sans",
// 	weight: "100 900",
// });
// const geistMono = localFont({
// 	src: "./fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

export const metadata: Metadata = {
  title: {
    template: '%s ',
    default: 'Hotel Reservation Dashboard',
  },
  description: 'Dashboard to manage hotel reservations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
