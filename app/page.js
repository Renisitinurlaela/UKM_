'use client';
import Link from 'next/link';
import { LogIn, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <img
        src="/bg-basket.jpg"
        alt="UKM Basket Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-gray-900/90 z-10" />

      {/* Content */}
      <main className="relative z-20 text-center p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-3xl mx-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4"
        >
          🏀 Selamat Datang di UKM Basket
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700 text-lg md:text-xl mb-6"
        >
          Bergabung dan tumbuhkan semangat juang dalam lapangan!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <Link href="/login">
            <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold shadow-md transition">
              <LogIn size={20} />
              Login
            </button>
          </Link>
          <Link href="/contact">
            <button className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-200 text-orange-700 border border-orange-400 rounded-lg font-semibold shadow-md transition">
              <Phone size={20} />
              Contact
            </button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-white z-20 text-center w-full">
        © {new Date().getFullYear()} UKM Basket Kampus. All rights reserved.
      </footer>
    </div>
  );
}