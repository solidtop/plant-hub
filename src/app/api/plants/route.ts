import ApiData from "@/types/ApiData";
import Plant from "@/types/Plant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  const apiUrl = `https://perenual.com/api/species-list?key=${process.env.API_KEY}&q=${query}&page=${page}`;
  const res = await fetch(apiUrl);
  const payload: ApiData = await res.json();

  const plants = convertToPlants(payload);

  return NextResponse.json(plants);
}

function convertToPlants(payload: ApiData): Plant[] {
  return payload.data.map((plant) => ({
    id: plant.id,
    commonName: plant.common_name,
    scientificName: plant.scientific_name,
    otherName: plant.other_name,
    cycle: plant.cycle,
    watering: plant.watering,
    sunlight: plant.sunlight,
    defaultImage: plant.default_image
      ? {
          license: plant.default_image.license,
          licenseName: plant.default_image.license_name,
          licenseUrl: plant.default_image.license_url,
          originalUrl: plant.default_image.original_url,
          regularUrl: plant.default_image.regular_url,
          mediumUrl: plant.default_image.medium_url,
          smallUrl: plant.default_image.small_url,
          thumbnail: plant.default_image.thumbnail,
        }
      : null,
  }));
}
