import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api-preview.cloudmos.io/internal/leases-duration";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const key = req.nextUrl.searchParams.get("key");
  if (!key)
    return new Response("key search param is required", { status: 400 });
  return fetch(`${BASE_URL}/${key}`, {
    redirect: "follow",
  }).then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      return Response.json(json);
    }
    return response.text().then((error) => {
      return new Response(error, { status: 500 });
    });
  });
};
