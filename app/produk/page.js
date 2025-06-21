async function getProduk() {
  const res = await fetch('http://localhost:3000/api/produk', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function ProdukPage() {
  const produk = await getProduk();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Produk UKM</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {produk.map((item) => (
          <div key={item.id} className="border rounded-xl p-4 shadow hover:shadow-md">
            <img src={item.gambar} className="w-full h-40 object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold">{item.nama}</h2>
            <p className="text-gray-600">Rp {item.harga.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
