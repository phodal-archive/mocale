import { CalendarModel } from "../model/calendar.model";
import { VALIDATE_ERROR } from "../model/common.model";
import { Length } from "class-validator";

export class CalendarEntity {
  // @ts-ignore
  @Length(2) title: string;

  constructor(model: CalendarModel) {

  }

  static create(model: CalendarModel) {
    if (model.title && model.title.length < 2 ) {
      return {
        type: VALIDATE_ERROR.MIN_LENGTH
      }
    }

    return new CalendarEntity(model);
  }
}
