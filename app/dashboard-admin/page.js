'use client';

import { useState, useEffect } from 'react';
import { Users, Calendar, Trophy, LogOut, Info, Menu, Trash2, Edit, ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SidebarItem = ({ icon: Icon, label, href, onClick }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(href);
        if (onClick) onClick();
      }}
      className="flex items-center gap-3 text-gray-200 hover:bg-orange-500 hover:text-white p-3 rounded-md cursor-pointer transition"
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  );
};

const Card = ({ title, value, icon: Icon, color }) => (
  <div className="bg-gradient-to-r from-gray-100 to-white p-5 rounded-xl shadow-lg flex justify-between items-center">
    <div>
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <Icon className={`w-10 h-10 ${color}`} />
  </div>
);

export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({ id: '', nama: '', harga: '', gambar: '', deskripsi: '' });
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleLogout = () => router.push('/login');

  const fetchProduk = async () => {
    const res = await fetch('/api/produk');
    const data = await res.json();
    setProduk(data);
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEdit ? 'PATCH' : 'POST';

    await fetch('/api/produk', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({ id: '', nama: '', harga: '', gambar: '', deskripsi: '' });
    setIsEdit(false);
    fetchProduk();
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    await fetch('/api/produk', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchProduk();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-gradient-to-b from-black to-gray-800 p-6 space-y-5 shadow-lg md:sticky top-0 h-screen z-30 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h2 className="text-white text-2xl font-bold mb-4 tracking-wide">🏀 UKM Basket</h2>
        <SidebarItem icon={Users} label="Data Anggota" href="/admin/anggota" onClick={toggleSidebar} />
        <SidebarItem icon={Calendar} label="Jadwal Latihan" href="/admin/jadwal" onClick={toggleSidebar} />
        <SidebarItem icon={Trophy} label="Event & Lomba" href="/admin/event" onClick={toggleSidebar} />
        <SidebarItem icon={Users} label="Pelatih & Pengurus" href="/admin/pelatih" onClick={toggleSidebar} />
        <SidebarItem icon={Users} label="Notifikasi" href="/admin/notifikasi" onClick={toggleSidebar} />
        <SidebarItem icon={ClipboardList} label="Absen Anggota" href="/admin/absen" onClick={toggleSidebar} />
        <SidebarItem icon={Info} label="Profil UKM" href="/profil-ukm" onClick={toggleSidebar} />

        <button
          onClick={handleLogout}
          className="mt-10 bg-orange-600 hover:bg-orange-700 text-white w-full py-2 rounded-md flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Mobile Sidebar Button */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-white bg-black/70 p-2 rounded-md">
          <Menu size={24} />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang, Admin</h1>
        <p className="text-gray-600 mb-8">Berikut ringkasan data UKM Basket:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card title="Anggota Aktif" value="58" icon={Users} color="text-sky-600" />
          <Card title="Jadwal Minggu Ini" value="3" icon={Calendar} color="text-orange-500" />
          <Card title="Event Mendatang" value="2" icon={Trophy} color="text-gray-800" />
          <Card title="Anggota Baru" value="6" icon={Users} color="text-black" />
        </div>

        {/* Form Produk */}
        <form onSubmit={handleSubmit} className="mb-10 space-y-4 max-w-md bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{isEdit ? 'Edit Produk' : 'Tambah Produk'}</h2>
          <input
            name="nama"
            placeholder="Nama Produk"
            value={form.nama}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="harga"
            type="number"
            placeholder="Harga"
            value={form.harga}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="gambar"
            placeholder="URL Gambar"
            value={form.gambar}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
          />
          <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
            {isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
          </button>
        </form>

        {/* Daftar Produk */}
        <h2 className="text-lg font-semibold mb-4">Daftar Produk</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produk.map((item) => (
            <div key={item.id} className="bg-white border rounded p-4 shadow relative">
              <img src={item.gambar} className="w-full h-40 object-cover mb-2 rounded" alt={item.nama} />
              <h3 className="text-lg font-bold">{item.nama}</h3>
              <p className="text-gray-600">Rp {parseInt(item.harga).toLocaleString()}</p>
              <p className="text-sm mt-1">{item.deskripsi}</p>
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 hover:underline text-sm flex items-center gap-1"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline text-sm flex items-center gap-1"
                >
                  <Trash2 size={16} /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
