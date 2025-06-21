'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EventAnggotaPage() {
  const [events, setEvents] = useState([])
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem('eventData')
    if (saved) {
      setEvents(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="min-h-screen p-8 bg-white">
      <button
        onClick={() => router.push('/dashboard-anggota')}
        className="mb-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4 text-orange-600">🎉 Event & Lomba UKM</h1>
      <p className="mb-6 text-gray-600">Berikut daftar event/lomba yang akan dilaksanakan:</p>

      {events.length === 0 ? (
        <p className="text-gray-500">Belum ada event.</p>
      ) : (
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event.id} className="border rounded p-4 shadow-sm">
              <h2 className="font-semibold text-lg">{event.nama}</h2>
              <p className="text-sm text-gray-600">{event.tanggal} - {event.lokasi}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
