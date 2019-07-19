import { ErrorModel, VALIDATE_ERROR } from "../model/common.model";
import { REPEAT_TYPE, TodoModel } from "../model/todo.model";

export class TodoEntity {
  title: string;
  content: string;
  completed: boolean;
  endDate: string = '';
  repeatDetail: string = '';
  startDate: string = '';
  repeat: REPEAT_TYPE = REPEAT_TYPE.ONE_TIME;

  constructor(model: TodoModel) {
    this.title = model.title;
    this.content = model.content;
    this.completed = model.completed;
    this.repeat = model.repeat;
    this.repeatDetail = model.repeatDetail;
    this.startDate = model.startDate;
    this.endDate = model.endDate;
  }

  buildFormModel(): TodoModel {
    return {
      title: this.title,
      endDate: this.endDate,
      repeat: this.repeat,
      repeatDetail: this.repeatDetail,
      startDate: this.startDate,
      content: this.content,
      completed: this.completed
    }
  }

  static create(model: TodoModel): TodoEntity | ErrorModel {
    if (!model) {
      return {
        type: VALIDATE_ERROR.EMPTY,
        error: '参数不能为空'
      }
    }
    if (model.title && model.title.length < 2) {
      return {
        type: VALIDATE_ERROR.MIN_LENGTH,
        field: 'title',
        error: '未达到最小长度：2'
      }
    }
    if (model.content && model.content.length < 2) {
      return {
        type: VALIDATE_ERROR.MIN_LENGTH,
        field: 'content',
        error: '未达到最小长度：2'
      }
    }

    return new TodoEntity(model);
  }
}
