import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todoId = req.query.id;

  if (req.method === "DELETE") {
    console.log("deleted", todoId);
    const todo = await prisma.todo.delete({
      where: { id: Number(todoId) },
    });
    res.json(todo);
  } else {
    console.log("Note could not be created");
  }
}
