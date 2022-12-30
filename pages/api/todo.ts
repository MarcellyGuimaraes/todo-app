// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createTodo } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [title, description] = JSON.parse(req.body);

  if (req.method === "POST") {
    await createTodo(title, description);
    return res.status(200).json({ message: "Success" });
  }
  res.status(200).json({ name: "John Doe" });
}
