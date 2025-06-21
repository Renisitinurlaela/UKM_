'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DataAbsenAdmin() {
  const [data, setData] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/absen')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="p-10">
      <button
        onClick={() => router.push('/dashboard-admin')}
        className="mb-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-6 text-orange-700">Data Kehadiran Anggota</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-orange-600 text-white">
            <th className="p-2 border">No</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Keterangan</th>
            <th className="p-2 border">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id} className="border hover:bg-orange-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{item.nama}</td>
              <td className="p-2 border">{item.keterangan}</td>
              <td className="p-2 border">{item.waktu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
