'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      // Simpan role ke localStorage
      localStorage.setItem('role', 'admin');
      setMessage('Login sukses sebagai Admin');
      setTimeout(() => {
        router.push('/dashboard-admin');
      }, 1200);
    } else if (username === 'mhs' && password === 'mhs') {
      // Simpan role ke localStorage
      localStorage.setItem('role', 'anggota');
      setMessage('Login sukses sebagai Anggota UKM');
      setTimeout(() => {
        router.push('/dashboard-anggota');
      }, 1200);
    } else {
      setMessage('❌ Username atau password salah');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <img
        src="/bg-basket.jpg"
        alt="Basketball Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-gray-200/80 z-0" />

      {/* Login Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6 tracking-wide">
          🏀 Login Sistem Informasi UKM Basket
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-sky-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="admin atau mhs"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-sky-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="admin atau mhs"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-semibold transition"
          >
            Login
          </button>

          {/* Tombol Kembali */}
          <Link href="/" passHref>
            <button
              type="button"
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-semibold transition"
            >
              ⬅ Kembali
            </button>
          </Link>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes('sukses') ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
