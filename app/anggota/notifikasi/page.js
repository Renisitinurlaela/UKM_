'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotifikasiAnggota() {
  const [notifikasi, setNotifikasi] = useState([])
  const router = useRouter()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('notifikasiData')) || []
    const updated = saved.map((n) => ({ ...n, dibaca: true })) // tandai sebagai dibaca
    localStorage.setItem('notifikasiData', JSON.stringify(updated))
    setNotifikasi(updated)
  }, [])

  return (
    <div className="min-h-screen p-10 bg-white">
      <button
        onClick={() => router.push('/dashboard-anggota')}
        className="mb-6 px-4 py-2 bg-orange-600 text-white rounded"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold text-orange-600 mb-4">🔔 Notifikasi</h1>

      {notifikasi.length === 0 ? (
        <p className="text-gray-500">Belum ada notifikasi.</p>
      ) : (
        <ul className="space-y-4">
          {notifikasi.map((n) => (
            <li
              key={n.id}
              className="p-4 border rounded bg-yellow-50 shadow-sm"
            >
              <p>{n.pesan}</p>
              <p className="text-sm text-gray-500 mt-1">{n.tanggal}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
