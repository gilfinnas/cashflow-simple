"use client"; // הוספנו את זה כי ThemeProvider הוא רכיב לקוח

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// --- התחל: הקוד של ThemeProvider הועבר ישירות לכאן ---
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
// --- סוף: הקוד של ThemeProvider ---


const inter = Inter({ subsets: ["latin"] });

// הערה: לא ניתן להשתמש ב-Metadata בקובץ שיש בו "use client"
// export const metadata: Metadata = {
//   title: "Cashflow App",
//   description: "Manage your cashflow easily",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
