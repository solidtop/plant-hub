import { ApiData } from "@/types/api";
import PlantConverter from "@/utils/PlantConverter";
import fetchData from "@/utils/fetchData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  const apiUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&q=${query}&page=${page}`;
  const payload = await fetchData<ApiData>(apiUrl);
  const plants = payload ? PlantConverter.convertToPlants(payload) : [];

  return NextResponse.json(plants);
}
