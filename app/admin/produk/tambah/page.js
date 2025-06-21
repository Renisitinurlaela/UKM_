'use client'

import { useState } from 'react'

export default function FormTambahProduk() {
  const [nama, setNama] = useState('')
  const [harga, setHarga] = useState('')
  const [gambarUrl, setGambarUrl] = useState('')
  const [gambarFile, setGambarFile] = useState(null)
  const [deskripsi, setDeskripsi] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nama', nama)
    formData.append('harga', harga)
    formData.append('deskripsi', deskripsi)

    if (gambarFile) {
      formData.append('gambar', gambarFile) // File diunggah
    } else if (gambarUrl) {
      formData.append('gambarUrl', gambarUrl) // URL digunakan
    }

    const res = await fetch('/api/produk', {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      alert('Produk berhasil ditambahkan!')
      setNama('')
      setHarga('')
      setDeskripsi('')
      setGambarUrl('')
      setGambarFile(null)
    } else {
      alert('Gagal menambahkan produk.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nama Produk"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <label className="block font-medium">Upload Gambar (opsional):</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setGambarFile(e.target.files?.[0] || null)}
        className="w-full border px-3 py-2 rounded"
      />

      <label className="block font-medium">Atau URL Gambar:</label>
      <input
        type="text"
        placeholder="https://..."
        value={gambarUrl}
        onChange={(e) => setGambarUrl(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        placeholder="Deskripsi"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        rows={4}
      />

      <button
        type="submit"
        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
      >
        Tambah Produk
      </button>
    </form>
  )
}
