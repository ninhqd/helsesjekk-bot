import "./global.css";

import { PropsWithChildren, ReactElement } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default async function RootLayout({
  children,
}: PropsWithChildren): Promise<ReactElement> {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto p-4 min-h-fit grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
