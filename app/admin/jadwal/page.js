'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function JadwalLatihanPage() {
  const router = useRouter()

  const [jadwal, setJadwal] = useState([])
  const [form, setForm] = useState({ hari: '', waktu: '', lokasi: '' })
  const [editId, setEditId] = useState(null)

  // Ambil data dari localStorage saat halaman dimuat
  useEffect(() => {
    const saved = localStorage.getItem('jadwalLatihan')
    if (saved) {
      setJadwal(JSON.parse(saved))
    }
  }, [])

  // Tangani perubahan input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Tambah atau edit jadwal
  const handleSubmit = (e) => {
    e.preventDefault()
    let updated = []

    if (editId) {
      updated = jadwal.map((item) =>
        item.id === editId ? { ...item, ...form } : item
      )
      setEditId(null)
    } else {
      const newItem = {
        id: Date.now(),
        ...form
      }
      updated = [...jadwal, newItem]
    }

    setJadwal(updated)
    setForm({ hari: '', waktu: '', lokasi: '' })
    localStorage.setItem('jadwalLatihan', JSON.stringify(updated))
  }

  // Edit jadwal
  const handleEdit = (item) => {
    setForm(item)
    setEditId(item.id)
  }

  // Hapus jadwal
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus jadwal ini?')
    if (confirmDelete) {
      const updated = jadwal.filter((item) => item.id !== id)
      setJadwal(updated)
      localStorage.setItem('jadwalLatihan', JSON.stringify(updated))
    }
  }

  return (
    <div className="min-h-screen bg-white p-10">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.push('/dashboard-admin')}
        className="mb-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
      >
        ← Kembali ke Dashboard
      </button>

      {/* Judul */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Jadwal Latihan (Admin)</h1>
      <p className="text-gray-600 mb-6">Kelola jadwal latihan UKM Basket di bawah ini.</p>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          name="hari"
          placeholder="Hari"
          value={form.hari}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="waktu"
          placeholder="Waktu"
          value={form.waktu}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="lokasi"
          placeholder="Lokasi"
          value={form.lokasi}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 sm:col-span-3 hover:bg-blue-700 transition"
        >
          {editId ? 'Simpan Perubahan' : 'Tambah Jadwal'}
        </button>
      </form>

      {/* Daftar Jadwal */}
      {jadwal.length > 0 ? (
        <ul className="space-y-4">
          {jadwal.map((item) => (
            <li
              key={item.id}
              className="border p-4 rounded shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{item.hari}</p>
                <p className="text-sm text-gray-600">
                  {item.waktu} - {item.lokasi}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Belum ada jadwal. Tambahkan jadwal latihan terlebih dahulu.</p>
      )}
    </div>
  )
}
