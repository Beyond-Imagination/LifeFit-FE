import Link from "next/link";
import { Home, Search, User } from "lucide-react";
import React from "react";
import "./globals.css";
import { AlertProvider } from "@/app/contexts/AlertContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-pink-600">
                LifeFit
              </Link>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-6">
            <AlertProvider>{children}</AlertProvider>
          </main>
          <nav className="bg-white border-t sticky bottom-0 z-10">
            <div className="container mx-auto px-4 py-2">
              <ul className="flex justify-between items-center">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-pink-600">
                    <Home />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    <Search />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    <User />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}
