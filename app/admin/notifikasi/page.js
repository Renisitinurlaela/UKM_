'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminNotifikasiPage() {
  const router = useRouter()
  const [pesan, setPesan] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newNotif = {
      id: Date.now(),
      pesan,
      tanggal: new Date().toLocaleString(),
      dibaca: false
    }

    const existing = JSON.parse(localStorage.getItem('notifikasiData')) || []
    const updated = [newNotif, ...existing]
    localStorage.setItem('notifikasiData', JSON.stringify(updated))
    setPesan('')
    alert('✅ Notifikasi dikirim!')
  }

  return (
    <div className="min-h-screen p-10 bg-white">
      <button
        onClick={() => router.push('/dashboard-admin')}
        className="mb-6 px-4 py-2 bg-orange-600 text-white rounded"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">Kirim Notifikasi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-3"
          placeholder="Tulis notifikasi untuk anggota..."
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kirim Notifikasi
        </button>
      </form>
    </div>
  )
}
