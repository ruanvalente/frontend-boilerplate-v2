import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import { Sidebar } from './ui/components/sidebar';
import { Header } from './ui/components/header';

import './globals.css';
import './themes/primereact';

const karla = Karla({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend Boilerplate',
  description: 'Generated by ruanvalente using the next.js framework'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${karla.className} bg-gray-100 flex`}>
        <Sidebar />
        <Header>
          <div className="w-full min-h-screen border-t flex flex-col">
            <main className="w-full flex-grow p-6">{children}</main>
          </div>
        </Header>
      </body>
    </html>
  );
}
