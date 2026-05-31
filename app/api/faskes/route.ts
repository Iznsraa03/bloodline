import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

/** GET /api/faskes — List all faskes with their blood stock */
export async function GET() {
  try {
    const faskes = await prisma.fasilitasKesehatan.findMany({
      include: { stokDarah: true },
      orderBy: { nama: "asc" },
    });
    return NextResponse.json(faskes);
  } catch (error) {
    console.error("Error fetching faskes:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data faskes." },
      { status: 500 }
    );
  }
}

/** POST /api/faskes — Create a new faskes */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const faskes = await prisma.fasilitasKesehatan.create({
      data: {
        nama: body.nama,
        alamat: body.alamat,
        lat: body.lat,
        lng: body.lng,
        kontak: body.kontak,
      },
    });
    return NextResponse.json(faskes, { status: 201 });
  } catch (error) {
    console.error("Error creating faskes:", error);
    return NextResponse.json(
      { error: "Gagal membuat faskes." },
      { status: 500 }
    );
  }
}
