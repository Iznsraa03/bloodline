import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

/** PUT /api/permintaan/[id] — Update request status */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const permintaan = await prisma.permintaanDarah.update({
      where: { id },
      data: { status: body.status },
    });
    return NextResponse.json(permintaan);
  } catch (error) {
    console.error("Error updating permintaan:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui status permintaan." },
      { status: 500 }
    );
  }
}
