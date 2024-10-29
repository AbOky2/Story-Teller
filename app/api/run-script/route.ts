import { NextRequest } from "next/server";

export async function POST(request : NextRequest) {
    const {story, page, path } = await request.json();
}