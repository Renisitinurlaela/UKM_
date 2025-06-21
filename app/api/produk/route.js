import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'public/data/produk.json');

export async function GET() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req) {
  const body = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const newProduk = { ...body, id: Date.now().toString() };
  data.push(newProduk);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(newProduk, { status: 201 });
}
