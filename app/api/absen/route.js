import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const filePath = path.join(process.cwd(), 'public/data/absen.json')

export async function GET() {
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    : []
  return NextResponse.json(data)
}

export async function POST(req) {
  const body = await req.json()
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    : []

  const newAbsen = {
    id: Date.now().toString(),
    nama: body.nama,
    keterangan: body.keterangan,
    waktu: new Date().toLocaleString(),
  }

  data.push(newAbsen)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  return NextResponse.json(newAbsen, { status: 201 })
}
