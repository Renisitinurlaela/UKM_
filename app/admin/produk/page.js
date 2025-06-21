'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProdukPage() {
  const [produk, setProduk] = useState([])
  const router = useRouter()

  // Ambil data produk dari file json
  useEffect(() => {
    fetch('/data/produk.json')
      .then(res => res.json())
      .then(data => setProduk(data))
  }, [])

  // Fungsi hapus produk
  const handleDeleteProduk = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus produk ini?');
    if (!confirm) return;

    try {
      const res = await fetch(`/api/produk/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Produk berhasil dihapus!');
        router.refresh(); // reload data di halaman
      } else {
        alert('Gagal menghapus produk!');
      }
    } catch (error) {
      console.error('Error saat menghapus:', error);
      alert('Terjadi kesalahan saat menghapus produk.');
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Daftar Produk</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {produk.map((item) => (
          <div key={item.id} className="border rounded-md p-4 shadow hover:shadow-lg transition">
            <Image
              src={item.gambar.startsWith('http') ? item.gambar : `/produk/${item.gambar}`}
              alt={item.nama}
              width={300}
              height={200}
              className="object-cover w-full h-40 rounded-md"
            />
            <h2 className="mt-4 text-xl font-semibold">{item.nama}</h2>
            <p className="text-gray-600">{item.deskripsi}</p>
            <button
              onClick={() => handleDeleteProduk(item.id)}
              className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
