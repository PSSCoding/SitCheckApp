"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside
            className={`fixed top-0 left-0 h-full bg-sky-700 text-white p-4 transform transition-transform duration-300 z-40
              ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}`}
          >
            <h2 className="text-xl font-bold mb-6">SitCheck</h2>
            <nav className="space-y-2">
              <a href="#" className="block px-3 py-2 rounded hover:bg-sky-600">Dashboard</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-sky-600">Buchungen</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-sky-600">Einstellungen</a>
            </nav>
          </aside>

          {/* Main Content */}
          <div
            className={`flex-1 min-h-screen transition-all duration-300 
              ${sidebarOpen ? "ml-64" : "ml-0"}`}
          >
            {/* Header */}
            <header className="bg-sky-600 text-white p-4 shadow-md flex items-center">
              {/* Hamburger Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center justify-center p-0 border-0 bg-sky-600 focus:outline-none appearance-none mr-4"
              >
                {sidebarOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-6 h-6">
                    <line x1="4" y1="4" x2="20" y2="20" />
                    <line x1="20" y1="4" x2="4" y2="20" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-6 h-6">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
              <h1 className="text-2xl font-bold">SitCheck</h1>
            </header>

            <main className="p-8">{children}</main>

            <footer className="bg-sky-600 text-white p-4 text-center">
              © 2025 Duale Hauptschule Baden Württemberg
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
