import {NextResponse} from "next/server";
import dbConnection from "@/lib/db/db-conection";

export const GET = async () => {
  try {
    const result = await dbConnection`SELECT * FROM classes`;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch grades" },
      { status: 500 }
    );
  }
};