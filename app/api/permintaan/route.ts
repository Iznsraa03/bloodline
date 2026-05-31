import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

/** GET /api/permintaan — List all blood requests with faskes info */
export async function GET() {
  try {
    const permintaan = await prisma.permintaanDarah.findMany({
      include: { faskes: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(permintaan);
  } catch (error) {
    console.error("Error fetching permintaan:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data permintaan." },
      { status: 500 }
    );
  }
}

/** POST /api/permintaan — Create emergency blood request */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const permintaan = await prisma.permintaanDarah.create({
      data: {
        faskesId: body.faskesId,
        golongan: body.golongan,
        rhesus: body.rhesus,
        jumlah: body.jumlah,
        status: "MENDESAK",
        keterangan: body.keterangan,
      },
    });
    return NextResponse.json(permintaan, { status: 201 });
  } catch (error) {
    console.error("Error creating permintaan:", error);
    return NextResponse.json(
      { error: "Gagal membuat permintaan darurat." },
      { status: 500 }
    );
  }
}
