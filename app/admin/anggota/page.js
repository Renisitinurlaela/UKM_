'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DataAnggotaPage() {
  const router = useRouter()
  const [anggota, setAnggota] = useState([])
  const [form, setForm] = useState({ nama: '', nim: '', angkatan: '', jabatan: '' })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetch('/data/anggota.json')
      .then(res => res.json())
      .then(data => setAnggota(data))
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (editId !== null) {
      const updated = anggota.map(a =>
        a.id === editId ? { ...a, ...form, id: editId } : a
      )
      setAnggota(updated)
      setEditId(null)
    } else {
      const newAnggota = {
        ...form,
        id: Date.now()
      }
      setAnggota([...anggota, newAnggota])
    }
    setForm({ nama: '', nim: '', angkatan: '', jabatan: '' })
  }

  const handleEdit = (a) => {
    setForm(a)
    setEditId(a.id)
  }

  const handleDelete = (id) => {
    const filtered = anggota.filter(a => a.id !== id)
    setAnggota(filtered)
  }

  const handleBack = () => {
    router.push('/dashboard-admin')
  }

  // ✅ return berada di dalam function component
  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6">📋 Data Anggota</h1>

        <div className="bg-gray-50 rounded-xl shadow p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={form.nama}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
            <input
              type="text"
              name="nim"
              placeholder="NIM"
              value={form.nim}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
            <input
              type="number"
              name="angkatan"
              placeholder="Angkatan"
              value={form.angkatan}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
            <input
              type="text"
              name="jabatan"
              placeholder="Jabatan"
              value={form.jabatan}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
            <button
              type="submit"
              className="col-span-1 sm:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold"
            >
              {editId ? 'Simpan Perubahan' : 'Tambah Anggota'}
            </button>
          </form>
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">NIM</th>
                <th className="px-4 py-2 border">Angkatan</th>
                <th className="px-4 py-2 border">Jabatan</th>
                <th className="px-4 py-2 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {anggota.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{a.nama}</td>
                  <td className="px-4 py-2 border">{a.nim}</td>
                  <td className="px-4 py-2 border">{a.angkatan}</td>
                  <td className="px-4 py-2 border">{a.jabatan}</td>
                  <td className="px-4 py-2 border text-center space-x-3">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-sky-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4">
          <button
            onClick={handleBack}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded inline-flex items-center"
          >
            ← Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
