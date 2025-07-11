import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");
  const key = process.env.GOOGLE_PLACES_API_KEY;

  const fields = [
    "name",
    "rating",
    "user_ratings_total",
    "formatted_address",
    "formatted_phone_number",
    "opening_hours",
    "website",
    "types",
    "reviews",
    "photo",
    "url",
  ].join(",");

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${key}`
  );

  const data = await res.json();
  return NextResponse.json(data.result);
}
