export interface Todo {
  id: string;
  body: string;
  isCompleted: boolean;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}