// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description } = req.body;

  try {
    await prisma.todo.create({
      data: {
        title,
        description,
      },
    });
    res.status(200).json({ message: "Todo criada com sucesso" });
  } catch (error) {
    console.log("Algo deu errado");
  }
}
