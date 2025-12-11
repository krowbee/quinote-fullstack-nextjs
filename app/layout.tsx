import HeaderWrapper from "./_components/HeaderWrapper";
import "./globals.css";
import AuthServerProvider from "./_providers/AuthServerProvider";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={inter.variable}>
      <body className="relative">
        <AuthServerProvider>
          <HeaderWrapper />
          {children}
        </AuthServerProvider>
      </body>
    </html>
  );
}
