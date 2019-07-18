import { VALIDATE_ERROR } from "../model/common.model";
import { Length } from "class-validator";
import { TodoModel } from "../model/todo.model";

export class ErrorModel {
  type: string;
  error: string;
}

export class TodoEntity {
  // @ts-ignore
  @Length(2) title: string;
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

  static validate(model: TodoModel): TodoEntity | ErrorModel {
    console.log(model);
    if (!model) {
      return {
        type: VALIDATE_ERROR.EMPTY,
        error: '长度要求'
      }
    }
    if (model.title && model.title.length < 2) {
      return {
        type: VALIDATE_ERROR.MIN_LENGTH,
        error: '长度要求'
      }
    }

    return new TodoEntity(model);
  }
}
