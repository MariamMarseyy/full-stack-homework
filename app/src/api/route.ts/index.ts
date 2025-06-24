import { NextRequest, NextResponse } from "next/server";
// import { sql } from "@vercel/postgres";

export const GET = async () => {
  try {
    // const result = await sql`SELECT * FROM grades ORDER BY id DESC`;
    // return NextResponse.json(result.rows);
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
    const { className, grade } = body;

    if (!className || grade < 0 || grade > 100) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // await sql`INSERT INTO grades (class, grade) VALUES (${className}, ${grade})`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to insert grade" },
      { status: 500 }
    );
  }
};
