import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return new Response("No file uploaded", { status: 400 });
    }

    // Parse the FormData from the request
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const mode = formData.get("mode");

    // Log the file details
    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }
    if (!mode) {
      return new Response("No mode provided", { status: 400 });
    }

    const res = await fetch(process.env.END_POINT_URL!, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Response from server:", data);
    return new NextResponse(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
