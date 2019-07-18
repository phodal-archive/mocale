import { CalendarModel } from "../model/calendar.model";
import { VALIDATE_ERROR } from "../model/common.model";

export class CalendarEntity {
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
