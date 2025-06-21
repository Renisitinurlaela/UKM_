'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductList({ isAdmin = false }) {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch('/api/produk');
        const data = await res.json();
        setProduk(data);
      } catch (err) {
        console.error('Gagal fetch data produk:', err);
      } 
    };

    fetchProduk();
  }, []);

  const handleHapus = async (id) => {
    const konfirmasi = confirm('Yakin ingin menghapus produk ini?');
    if (!konfirmasi) return;

    try {
      const res = await fetch(`/api/produk/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProduk((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Gagal menghapus produk');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {produk.map((item) => (
        <div
          key={item.id}
          className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={item.gambar}
            alt={item.nama}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{item.nama}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.deskripsi}</p>
            <p className="text-orange-600 font-semibold mb-4">
              Rp {parseInt(item.harga).toLocaleString()}
            </p>

            <div className="flex gap-2">
              <Link
                href={`/produk/${item.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Detail
              </Link>
              {isAdmin && (
                <>
                  <Link
                    href={`/admin/produk/edit/${item.id}`}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleHapus(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
