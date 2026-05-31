import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

/** GET /api/faskes/[id] — Get faskes detail with stock and requests */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const faskes = await prisma.fasilitasKesehatan.findUnique({
      where: { id },
      include: { stokDarah: true, permintaan: true },
    });

    if (!faskes) {
      return NextResponse.json(
        { error: "Faskes tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json(faskes);
  } catch (error) {
    console.error("Error fetching faskes:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data faskes." },
      { status: 500 }
    );
  }
}

/** PUT /api/faskes/[id] — Update faskes info */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const faskes = await prisma.fasilitasKesehatan.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(faskes);
  } catch (error) {
    console.error("Error updating faskes:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui faskes." },
      { status: 500 }
    );
  }
}
