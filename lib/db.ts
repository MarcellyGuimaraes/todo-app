import { prisma } from "./prisma";
export interface Todo {
  id: number;
  // title: string;
  [key: string]: any;
  description: string;
}

export async function getAllTodos() {
  const data = await prisma.todo.findMany();

  console.log(data);
  return data;
}

export async function createTodo(title: string, description: string) {
  console.log();
  await prisma.todo.create({
    data: {
      title,
      description,
    },
  });
}
