"use client"

import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import { usePathname } from 'next/navigation'


import Footer from "../components/footer";
import Navbar from "@/components/navbar";
import MainNavbar from "@/components/mainNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const currentPath = usePathname()
    console.log(currentPath)

  // Routes where no Navbar should be displayed 
  const noNavbarRoutes = ['/']; // Homepage route

  // Routes where MainNavbar (NewNavbar) should be displayed
  const mainNavbarRoutes = ['/login', '/register'];

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <body>
      <Providers>
          {!noNavbarRoutes.includes(currentPath) && !mainNavbarRoutes.includes(currentPath) && <MainNavbar />}
          {mainNavbarRoutes.includes(currentPath) && <Navbar />}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}