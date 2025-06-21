'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminEventPage() {
  const router = useRouter()
  const [events, setEvents] = useState([])
  const [form, setForm] = useState({ nama: '', tanggal: '', lokasi: '' })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('eventData')
    if (saved) {
      setEvents(JSON.parse(saved))
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let updated = []

    if (editId) {
      updated = events.map(item => item.id === editId ? { ...item, ...form } : item)
      setEditId(null)
    } else {
      const newItem = { id: Date.now(), ...form }
      updated = [...events, newItem]
    }

    setEvents(updated)
    localStorage.setItem('eventData', JSON.stringify(updated))
    setForm({ nama: '', tanggal: '', lokasi: '' })
  }

  const handleEdit = (item) => {
    setForm(item)
    setEditId(item.id)
  }

  const handleDelete = (id) => {
    const updated = events.filter(item => item.id !== id)
    setEvents(updated)
    localStorage.setItem('eventData', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen p-10 bg-white">
      <button
        onClick={() => router.push('/dashboard-admin')}
        className="mb-6 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">Kelola Event & Lomba</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          name="nama"
          placeholder="Nama Event"
          value={form.nama}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="tanggal"
          placeholder="Tanggal"
          value={form.tanggal}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="lokasi"
          placeholder="Lokasi"
          value={form.lokasi}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
          {editId ? 'Simpan Perubahan' : 'Tambah Event'}
        </button>
      </form>

      <ul className="space-y-4">
        {events.map(event => (
          <li key={event.id} className="border p-4 rounded flex justify-between">
            <div>
              <p className="font-semibold">{event.nama}</p>
              <p className="text-sm text-gray-500">{event.tanggal} - {event.lokasi}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(event)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:underline">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
