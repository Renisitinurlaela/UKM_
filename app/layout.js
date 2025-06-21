import './globals.css';
import Navbar from './components/navbar';

export const metadata = {
  title: 'Sistem Informasi UKM Basket',
  description: 'Website resmi UKM Basket kampus',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-800">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
