import HeaderWrapper from "./components/HeaderWrapper";
import "./globals.css";
import AuthClientProvider from "./_providers/AuthClientProvider";
import { Inter, Space_Grotesk } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.variable} ${spaceGrotesk.variable} relative`}>
        <AuthClientProvider>
          <HeaderWrapper />
          {children}
        </AuthClientProvider>
      </body>
    </html>
  );
}
