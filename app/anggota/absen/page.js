'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AbsenPage() {
  const [nama, setNama] = useState('')
  const [keterangan, setKeterangan] = useState('Hadir')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/absen', {
      method: 'POST',
      body: JSON.stringify({ nama, keterangan }),
    })
    if (res.ok) {
      alert('Absen berhasil!')
      setNama('')
      setKeterangan('Hadir')
    } else {
      alert('Gagal absen.')
    }
  }

  return (
    <div className="p-10">
      <button
        onClick={() => router.push('/dashboard-anggota')}
        className="mb-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4 text-orange-700">Form Absen Kehadiran</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <select
          className="w-full border p-2 rounded"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        >
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
        </select>
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">
          Submit Absen
        </button>
      </form>
    </div>
  )
}
