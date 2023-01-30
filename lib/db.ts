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
