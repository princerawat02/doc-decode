import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocDecode - AI-Powered Legal Document Analysis",
  description: "Transform complex legal documents into clear, understandable insights. Get instant summaries, clause explanations, risk assessments, and AI-powered Q&A for any legal document.",
  keywords: "legal document analysis, AI legal assistant, document summarization, legal jargon translator, contract review, legal risk assessment",
  authors: [{ name: "DocDecode Team" }],
  openGraph: {
    title: "DocDecode - AI-Powered Legal Document Analysis",
    description: "Transform complex legal documents into clear, understandable insights with AI-powered analysis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
