'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function JadwalAnggotaPage() {
  const router = useRouter()
  const [jadwal, setJadwal] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('jadwalLatihan')
    if (data) {
      setJadwal(JSON.parse(data))
    }
  }, [])

  return (
    <div className="min-h-screen bg-white p-10">
      <button
        onClick={() => router.push('/dashboard-anggota')}
        className="mb-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">Jadwal Latihan</h1>
      <p className="text-gray-600 mb-6">Berikut adalah jadwal latihan yang telah ditentukan oleh admin:</p>

      {jadwal.length > 0 ? (
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {jadwal.map((item) => (
            <li key={item.id}>
              {item.hari}, {item.waktu} - {item.lokasi}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Belum ada jadwal tersedia.</p>
      )}
    </div>
  )
}
