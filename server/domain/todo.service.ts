import { TodoEntity } from "../../common/entity/todo.entity";
import { TodoModel } from "../../common/model/todo.model";
import { ErrorModel } from "../../common/model/common.model";

export class TodoService {
  constructor() {
  }

  createTodo(model): ErrorModel | TodoModel {
    let todoEntity = TodoEntity.create(model);
    if (todoEntity['type']) {
      return todoEntity;
    } else {
      let todoEntity1 = new TodoEntity(model);
      return todoEntity1.buildFormModel();
    }
  }
}
