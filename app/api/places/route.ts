import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const type = searchParams.get("type");
  const radius = searchParams.get("radius");
  const price_level = searchParams.get("price_level");

  const key = process.env.GOOGLE_PLACES_API_KEY;

  const params = new URLSearchParams({
    location: `${lat},${lng}`,
    radius: radius || "1000",
    type: type || "restaurant",
    key: key!,
  });

  if (price_level) {
    params.append("minprice", price_level);
    params.append("maxprice", price_level);
  }

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params.toString()}`
  );
  const data = await res.json();

  return NextResponse.json(data.results);
}
