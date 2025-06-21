export default function AdminProdukLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-orange-500 p-4 font-bold">Admin - Kelola Produk UKM Basket</header>
      <main className="p-6">{children}</main>
    </div>
  );
}