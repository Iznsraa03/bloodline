import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

/** GET /api/pendonor — List all donors */
export async function GET() {
  try {
    const pendonor = await prisma.pendonorSiaga.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pendonor);
  } catch (error) {
    console.error("Error fetching pendonor:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pendonor." },
      { status: 500 }
    );
  }
}

/** POST /api/pendonor — Register new donor */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pendonor = await prisma.pendonorSiaga.create({
      data: {
        nama: body.nama,
        golonganDarah: body.golonganDarah,
        rhesus: body.rhesus,
        telepon: body.telepon,
        desa: body.desa,
        wilayah: body.wilayah,
        statusAktif: "AKTIF",
      },
    });
    return NextResponse.json(pendonor, { status: 201 });
  } catch (error) {
    console.error("Error creating pendonor:", error);
    return NextResponse.json(
      { error: "Gagal mendaftarkan pendonor." },
      { status: 500 }
    );
  }
}
