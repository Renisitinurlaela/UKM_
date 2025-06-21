import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <img
        src="/bg-basket.jpg"
        alt="Basket Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-gray-200/80 z-0" />

      {/* Contact Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">📞 Contact Person</h1>

        <img
          src="/profile.jpg"
          alt="Foto Profil"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-500"
        />

        <div className="text-gray-800 space-y-2 text-sm sm:text-base">
          <p><strong>Nama:</strong> Reni Siti Nurlaela</p>
          <p><strong>NIM:</strong> 232505043</p>
          <p><strong>Prodi:</strong> Sistem Informasi-B</p>
          <p><strong> Fakultas Komputer </strong></p>
          <p><strong>Email:</strong> renisitinurlaela@gmail.com</p>
          <p><strong>Alamat:</strong> Jatinangor, Sumedang</p>
          <p><strong>Hobi:</strong> Coding, Desain, Jalan-Jalan</p>
        </div>

        <Link href="/">
          <button className="mt-6 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-semibold transition">
            ⬅ Kembali
          </button>
        </Link>
      </div>
    </div>
  );
}
