import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const type = searchParams.get("type");
  const radius = searchParams.get("radius");
  const price_level = searchParams.get("price_level");
  const keyword = searchParams.get("keyword");
  const fetch_all = searchParams.get("fetch_all") === "true"; // important

  const key = process.env.GOOGLE_PLACES_API_KEY;

  if (!lat || !lng || !key) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const baseParams = new URLSearchParams({
    location: `${lat},${lng}`,
    radius: radius || "1000",
    type: type || "restaurant",
    keyword: keyword || "",
    key,
  });

  if (price_level && price_level !== "0") {
    baseParams.append("minprice", price_level);
    baseParams.append("maxprice", price_level);
  }

  // If fetch_all is false, just return the first page
  if (!fetch_all) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${baseParams.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data.results);
  }

  // Else paginate
  const results: any[] = [];
  let pageToken: string | null = null;
  let attempt = 0;

  do {
    const params = new URLSearchParams(baseParams);
    if (pageToken) {
      // only pagetoken is needed on subsequent requests
      params.delete("location");
      params.delete("radius");
      params.delete("type");
      params.delete("keyword");
      params.delete("minprice");
      params.delete("maxprice");
      params.append("pagetoken", pageToken);
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params.toString()}`;
    if (pageToken) {
      await new Promise((r) => setTimeout(r, 2000)); // Required by Google
    }

    console.log("Fetching places with:", url);
    const res = await fetch(url);
    const data = await res.json();

    if (data.results) results.push(...data.results);
    pageToken = data.next_page_token ?? null;
    attempt++;
  } while (pageToken && attempt < 3);

  return NextResponse.json(results);
}
