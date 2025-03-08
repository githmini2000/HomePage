import { CategoryProvider } from "@/context/CategoryContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CategoryProvider>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </CategoryProvider>
  );
}
