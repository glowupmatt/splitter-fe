export function POST(request: Request) {
  try {
    if (!request.body) {
      return new Response("No file uploaded", { status: 400 });
    }
    console.log("Request body:", request.body);
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
