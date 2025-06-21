'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProduk() {
  const { id } = useParams();
  const [form, setForm] = useState({ nama: '', deskripsi: '', harga: '', gambar: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/produk/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/produk/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
    });
    router.push('/dashboard-admin');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
      <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} />
      <input value={form.harga} type="number" onChange={e => setForm({ ...form, harga: e.target.value })} />
      <input value={form.gambar} onChange={e => setForm({ ...form, gambar: e.target.value })} />
      <button type="submit">Simpan Perubahan</button>
    </form>
  );
}
