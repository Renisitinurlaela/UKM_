'use client';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProfilUKM() {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState('/');

  // Deteksi role user saat komponen dimuat
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      setRedirectTo('/dashboard-admin');
    } else if (role === 'anggota') {
      setRedirectTo('/dashboard-anggota');
    } else {
      setRedirectTo('/login');
    }
  }, []);

  const handleBack = () => {
    router.push(redirectTo);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Tombol Kembali */}
      <button
        onClick={handleBack}
        className="mb-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-3xl font-bold text-orange-700 mb-6">Profil UKM Basket</h1>

      <p className="text-gray-800 text-lg mb-6 leading-relaxed">
        <strong>UKM Basket</strong> merupakan wadah pengembangan minat dan bakat mahasiswa dalam bidang olahraga basket. 
        UKM ini aktif menyelenggarakan latihan rutin, kegiatan sosial, serta mengikuti berbagai kejuaraan.
      </p>

      {/* Slideshow Foto */}
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        className="rounded-lg shadow-lg mb-10"
      >
        <div>
          <Image src="/kegiatan1.jpg" alt="Kegiatan 1" width={800} height={450} className="object-cover w-full h-80 rounded-lg" />
        </div>
        <div>
          <Image src="/kegiatan2.jpg" alt="Kegiatan 2" width={800} height={450} className="object-cover w-full h-80 rounded-lg" />
        </div>
        <div>
          <Image src="/kegiatan3.jpg" alt="Kegiatan 3" width={800} height={450} className="object-cover w-full h-80 rounded-lg" />
        </div>
      </Carousel>

      {/* Video */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Video Kegiatan Kami</h2>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/XVZiR7biNHw"
            title="YouTube UKM Basket"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Testimoni */}
      <div className="bg-orange-50 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-orange-800 mb-4">Testimoni Anggota</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md shadow">
            <p className="text-gray-700 italic">
              "UKM Basket bukan hanya tempat latihan, tapi juga tempat kami tumbuh bersama seperti keluarga."
            </p>
            <p className="mt-2 font-semibold text-orange-700">— Rafi, Ketua UKM</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <p className="text-gray-700 italic">
              "Banyak pengalaman seru dan menantang. UKM ini mengubah semangat kompetisi saya ke level baru."
            </p>
            <p className="mt-2 font-semibold text-orange-700">— Maya, Atlet Tim Putri</p>
          </div>
        </div>
      </div>
    </div>
  );
}
