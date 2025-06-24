import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/lib/db/db-conection";
// import { sql } from "@vercel/postgres";

export const GET = async () => {
  try {
    const pairs = await dbConnection`
        SELECT
            n1.id       AS id1,
            n1.value    AS number1,
            n2.id       AS id2,
            n2.value    AS number2,
            n1.value + n2.value AS sum
        FROM numbers n1
                 INNER JOIN numbers n2 ON n2.id = n1.id + 1
        ORDER BY n1.id;
    `;
    return NextResponse.json(pairs);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch grades" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { number } = body;

    if (!number) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await dbConnection`INSERT INTO numbers (value) VALUES (${number})`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to insert grade" },
      { status: 500 }
    );
  }
};
