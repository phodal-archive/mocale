import { ErrorModel, VALIDATE_ERROR } from "../model/common.model";
import { TodoModel } from "../model/todo.model";

export class TodoEntity {
  title: string;
  content: string;
  completed: boolean;

  constructor(model: TodoModel) {
    this.title = model.title;
    this.content = model.content;
    this.completed = model.completed;
  }

  buildFormModel(): TodoModel {
    return {
      title: this.title,
      content: this.content,
      completed: this.completed
    }
  }

  static create(model: TodoModel): TodoEntity | ErrorModel {
    console.log(model);
    if (!model) {
      return {
        type: VALIDATE_ERROR.EMPTY,
        error: '不能为空'
      }
    }
    if (model.title && model.title.length < 2) {
      return {
        type: VALIDATE_ERROR.MIN_LENGTH,
        field: 'title',
        error: '长度要求'
      }
    }

    return new TodoEntity(model);
  }
}
