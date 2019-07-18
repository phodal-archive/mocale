import { ErrorModel, TodoEntity } from "../../common/entity/todo.entity";
import { TodoModel } from "../../common/model/todo.model";

export class TodoService {
  constructor() {
  }

  createTodo(model): ErrorModel | TodoModel {
    let todoEntity = TodoEntity.validate(model);
    if (todoEntity['type']) {
      return todoEntity;
    } else {
      let todoEntity1 = new TodoEntity(model);
      return todoEntity1.buildFormModel();
    }
  }
}
