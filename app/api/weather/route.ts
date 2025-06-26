import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/lib/getWeather";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") || "Dubai";

  try {
    const res = await getData(city);
    return NextResponse.json(res.props.data);
  } catch {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }
}
