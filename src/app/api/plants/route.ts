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
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page");

  const apiUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&q=${query}&page=${page}`;
  const res = await fetch(apiUrl);
  const payload: Payload = await res.json();

  return NextResponse.json(payload);
}
