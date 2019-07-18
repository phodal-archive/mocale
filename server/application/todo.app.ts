import { TodoService } from "../domain/todo.service";

export class TodoApp {
  constructor(private todoService: TodoService) {

  }

  createTodo() {
    this.todoService.createTodo();
  }
}
