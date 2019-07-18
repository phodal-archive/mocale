export interface TodoModel {
  id?: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt?: number;
  modifiedAt?: number;
}
