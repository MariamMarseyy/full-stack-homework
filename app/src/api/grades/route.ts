import {NextRequest, NextResponse} from "next/server";
import dbConnection from "@/lib/db/db-conection";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {classId, grade} = body;

    if (!classId || grade < 0 || grade > 100) {
      return NextResponse.json({error: "Invalid input"}, {status: 400});
    }

    const findedClass = dbConnection`SELECT *
                               FROM classes c
                               WHERE c.id = ${classId}
                               LIMIT 1`;

    if (!findedClass) {
      return NextResponse.json({error: "Invalid input"}, {status: 400});
    }

    await dbConnection`INSERT INTO grades (class_id, grade)
                       VALUES (${findedClass.id}, ${grade})`;

    return NextResponse.json({success: true});
  } catch {
    return NextResponse.json(
      {error: "Failed to insert grade"},
      {status: 500}
    );
  }
};

export const GET = async () => {
  try {
    const result = await dbConnection`SELECT * FROM grades`;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch grades" },
      { status: 500 }
    );
  }
};