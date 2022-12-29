import { prisma } from "./prisma";
export interface Todo {
  id: number;
  description: string;
}

export async function getAllTodos() {
  const data = await prisma.todo.findMany();

  //   console.log(data);
  return data;
}

export async function createTodo(description: string) {
  prisma.todo.create({
    data: {
      description,
    },
  });
}
