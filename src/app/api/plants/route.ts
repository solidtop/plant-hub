import { getPlants } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  const plants = await getPlants(query, Number.parseInt(page));

  return NextResponse.json(plants);
}
