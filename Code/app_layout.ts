import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shop Web - Cửa hàng trực tuyến',
  description: 'Mua sắm trực tuyến với các sản phẩm chất lượng cao',
  openGraph: {
    title: 'Shop Web',
    description: 'Khám phá sản phẩm yêu thích với giá tốt nhất',
    url: 'https://your-service-name.onrender.com',
    type: 'website',
  },
  verification: {
    google: 'your-verification-code', // Thay bằng mã Google Search Console
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900 antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}