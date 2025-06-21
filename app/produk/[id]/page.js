import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/data/produk.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return data.map((item) => ({
    id: item.id
  }));
}

export default function DetailProduk({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/produk.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const produk = data.find((item) => item.id === params.id);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{produk.nama}</h1>
      <img src={produk.gambar} alt={produk.nama} className="w-64 h-64 object-cover mb-4" />
      <p className="mb-2">{produk.deskripsi}</p>
      <p className="text-orange-600 font-semibold">Rp {parseInt(produk.harga).toLocaleString()}</p>
    </div>
  );
}
