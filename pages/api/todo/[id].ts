import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description } = req.body;
  const todoId = req.query.id;

  try {
    switch (req.method) {
      case "DELETE":
        const todo = await prisma.todo.delete({
          where: { id: Number(todoId) },
        });
        res.json(todo);
        break;
      case "PUT":
        await prisma.todo.update({
          where: {
            id: Number(todoId),
          },
          data: {
            title: title,
            description: description,
          },
        });
        res.status(200).json({ message: "Todo editada com sucesso" });
        break;
      default:
        console.log("A tarefa não pode ser deletada/editada");
        break;
    }
  } catch (error) {
    console.log("Algo deu errado");
  }
}
