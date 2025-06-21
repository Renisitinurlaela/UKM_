'use client'

import { useRouter } from 'next/navigation'
import { Users } from 'lucide-react'

export default function PelatihPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-white p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 border border-orange-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
            <Users className="w-7 h-7 text-orange-500" />
            Pelatih & Pengurus UKM
          </h1>
          <button
            onClick={() => router.push('/dashboard-admin')}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
          >
            ← Kembali
          </button>
        </div>

        <div className="space-y-4 mt-4">
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-md shadow-sm">
            <p className="text-gray-800">
              <strong className="text-orange-600">Pelatih:</strong> Budi Santoso
            </p>
          </div>
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-md shadow-sm">
            <p className="text-gray-800">
              <strong className="text-orange-600">Asisten Pelatih:</strong> Rina Kurnia
            </p>
          </div>
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-md shadow-sm">
            <p className="text-gray-800">
              <strong className="text-orange-600">Ketua UKM:</strong> Rafi Ahmad
            </p>
          </div>
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-md shadow-sm">
            <p className="text-gray-800">
              <strong className="text-orange-600">Sekretaris:</strong> Reni Siti Nurlaela
            </p>
          </div>
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-md shadow-sm">
            <p className="text-gray-800">
              <strong className="text-orange-600">Bendahara:</strong> Nadya Putri
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
