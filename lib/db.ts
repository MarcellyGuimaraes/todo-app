import { prisma } from "./prisma";
export interface Todo {
  id: number;
  title: string;
  description: string;
}

export async function getAllTodos() {
  const data = await prisma.todo.findMany();

  return data;
}

export async function createTodo(description: string, title: string) {
  await prisma.todo.create({
    data: {
      title,
      description,
    },
  });
}
