export interface Todo {
  id: string;
  body: string;
  isCompleted: boolean;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}