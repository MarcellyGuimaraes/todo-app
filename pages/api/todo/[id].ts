import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description } = req.body;
  const todoId = req.query.id;

  if (req.method === "DELETE") {
    const todo = await prisma.todo.delete({
      where: { id: Number(todoId) },
    });
    res.json(todo);
  } else if (req.method === "PUT") {
    try {
      await prisma.todo.update({
        where: {
          id: Number(todoId),
        },
        data: {
          title: title,
          description: description,
        },
      });
      res.status(200).json({ message: "Todo criada com sucesso" });
    } catch (error) {
      console.log("Algo deu errado");
    }
  } else {
    console.log("Note could not be created");
  }
}
