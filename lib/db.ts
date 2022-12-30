import { prisma } from "./prisma";
export interface Todo {
  id: number;
  title: string;
  description: string;
}

export interface FormData {
  title: string;
  description: string;
  id: number;
}

export interface PostProps {
  todos: Todo[];
}

export interface FormData {
  title: string;
  description: string;
  id: number;
}

export async function getAllTodos() {
  const data = await prisma.todo.findMany();

  console.log(data);
  return data;
}
