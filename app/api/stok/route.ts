import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

/** GET /api/stok — List all blood stock, optionally filtered by faskes */
export async function GET(request: NextRequest) {
  const faskesId = request.nextUrl.searchParams.get("faskesId");

  try {
    const stok = await prisma.stokDarah.findMany({
      where: faskesId ? { faskesId } : undefined,
      include: { faskes: true },
      orderBy: { golongan: "asc" },
    });
    return NextResponse.json(stok);
  } catch (error) {
    console.error("Error fetching stok:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data stok." },
      { status: 500 }
    );
  }
}

/** PUT /api/stok — Upsert blood stock (update or create) */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { faskesId, golongan, rhesus, jumlah } = body;

    const stok = await prisma.stokDarah.upsert({
      where: {
        faskesId_golongan_rhesus: { faskesId, golongan, rhesus },
      },
      update: { jumlah },
      create: { faskesId, golongan, rhesus, jumlah },
    });

    return NextResponse.json(stok);
  } catch (error) {
    console.error("Error updating stok:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui stok." },
      { status: 500 }
    );
  }
}
