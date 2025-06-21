// app/dashboard-anggota/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, LogOut } from 'lucide-react'

export default function DashboardAnggota() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [produk, setProduk] = useState([])

  const toggleMenu = () => setMenuOpen(prev => !prev)

  const handleLogout = () => {
    localStorage.removeItem('role')
    router.push('/login')
  }

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch('/api/produk')
        const data = await res.json()
        setProduk(data)
      } catch (error) {
        console.error('Gagal mengambil data produk:', error)
      }
    }

    fetchProduk()
  }, [])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-gradient-to-b from-black to-gray-900 text-white p-6">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-orange-500">🏀 UKM Basket</h2>
          <nav className="space-y-3">
            <Link href="/anggota/jadwal" className="block hover:text-orange-400 flex items-center gap-2">
              📅 <span>Jadwal Latihan</span>
            </Link>
            <Link href="/anggota/event" className="block hover:text-orange-400 flex items-center gap-2">
              🏆 <span>Event & Lomba</span>
            </Link>
            <Link href="/anggota/notifikasi" className="block hover:text-orange-400 flex items-center gap-2">
              🔔 <span>Notifikasi</span>
            </Link>
            <Link href="/anggota/absen" className="block hover:text-orange-400 flex items-center gap-2">
              📝 <span>Absen</span>
            </Link>
            <Link href="/profil-ukm" className="block hover:text-orange-400 flex items-center gap-2">
              ℹ️ <span>Profil UKM</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-orange-600 text-white px-4 py-3">
        <h2 className="text-xl font-bold">🏀 UKM Basket</h2>
        <button onClick={toggleMenu}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black text-white space-y-4 p-4">
          <Link href="/anggota/jadwal" onClick={() => setMenuOpen(false)} className="block hover:text-orange-400">
            📅 Jadwal Latihan
          </Link>
          <Link href="/anggota/event" onClick={() => setMenuOpen(false)} className="block hover:text-orange-400">
            🏆 Event & Lomba
          </Link>
          <Link href="/anggota/notifikasi" onClick={() => setMenuOpen(false)} className="block hover:text-orange-400">
            🔔 Notifikasi
          </Link>
          <Link href="/anggota/absen" onClick={() => setMenuOpen(false)} className="block hover:text-orange-400">
            📝 Absen
          </Link>
          <Link href="/profil-ukm" onClick={() => setMenuOpen(false)} className="block hover:text-orange-400">
            ℹ️ Profil UKM
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false)
              handleLogout()
            }}
            className="flex items-center gap-2 text-red-400 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang, Anggota</h1>
        <p className="text-gray-600 mb-8">Berikut informasi penting untukmu:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div onClick={() => router.push('/anggota/jadwal')} className="bg-white hover:shadow-lg border rounded-lg p-6 cursor-pointer transition">
            <h2 className="text-xl font-semibold text-blue-600">Jadwal Latihan</h2>
            <p className="text-gray-700 mt-2">Latihan rutin hari Sabtu & Minggu pukul 16.00 - 18.00 di GOR Kampus.</p>
          </div>

          <div onClick={() => router.push('/anggota/event')} className="bg-white hover:shadow-lg border rounded-lg p-6 cursor-pointer transition">
            <h2 className="text-xl font-semibold text-purple-600">Event Mendatang</h2>
            <p className="text-gray-700 mt-2">Turnamen antar fakultas dimulai bulan depan. Daftarkan dirimu segera!</p>
          </div>

          <div onClick={() => router.push('/anggota/absen')} className="bg-white hover:shadow-lg border rounded-lg p-6 cursor-pointer transition">
            <h2 className="text-xl font-semibold text-orange-600">Absen Kehadiran</h2>
            <p className="text-gray-700 mt-2">Isi form kehadiran setiap kali latihan berlangsung.</p>
          </div>

          <div onClick={() => router.push('/profil-ukm')} className="bg-white hover:shadow-lg border rounded-lg p-6 cursor-pointer transition">
            <h2 className="text-xl font-semibold text-emerald-600">Profil UKM</h2>
            <p className="text-gray-700 mt-2">UKM Basket mendukung pengembangan skill dan mental bertanding mahasiswa.</p>
            <p className="text-orange-500 mt-2 text-sm hover:underline">Lihat Selengkapnya →</p>
          </div>
        </div>

        {/* Produk Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Merchandise UKM</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {produk.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 shadow">
                <img src={item.gambar} alt={item.nama} className="w-full h-40 object-cover mb-2 rounded" />
                <h3 className="text-lg font-semibold text-orange-700">{item.nama}</h3>
                <p className="text-gray-700">Rp{item.harga}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
