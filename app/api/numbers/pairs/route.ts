import dbConnection from "@/lib/db/db-conection";

export async function GET() {
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
    return Response.json(pairs);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to fetch grades" }, { status: 500 });
  }
}
