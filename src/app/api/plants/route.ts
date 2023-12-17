import { Plant } from "@/types/Plant";
import { NextRequest, NextResponse } from "next/server";

type Payload = {
  data: Plant[];
  to: number;
  perPage: number;
  currentPage: number;
  from: number;
  lastPage: number;
  total: number;
};

export async function GET(req: NextRequest) {
  const apiUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}`;
  const res = await fetch(apiUrl);
  const payload: Payload = await res.json();
  const plants: Plant[] = payload.data;

  return NextResponse.json(plants);
}
