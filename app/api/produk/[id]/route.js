// /app/api/produk/[id]/route.js

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Path ke file JSON produk
const filePath = path.join(process.cwd(), 'public/data/produk.json');

// Ambil produk berdasarkan ID
export async function GET(_, { params }) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const produk = data.find((p) => p.id === params.id);
  return NextResponse.json(produk || {}, { status: produk ? 200 : 404 });
}

// Update produk berdasarkan ID
export async function PUT(req, { params }) {
  const body = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const index = data.findIndex((p) => p.id === params.id);
  if (index === -1) return NextResponse.json({ message: 'Not Found' }, { status: 404 });

  data[index] = { ...data[index], ...body };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(data[index]);
}

// Hapus produk berdasarkan ID
export async function DELETE(_, { params }) {
  let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const newData = data.filter((p) => p.id !== params.id);

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
  return NextResponse.json({ message: 'Deleted' });
}
