export enum REPEAT_TYPE {
  ONE_TIME,
  DAILY,
  MONDAY_TO_FRIDAY,
  EVERY_WEEK,
  EVERY_MONTH_WEEKEND,
  EVERY_MONTH_DAY,
  EVERY_YEAR,
  CUSTOM,
}

export interface TodoModel {
  id?: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt?: number;
  modifiedAt?: number;
  startDate?: string;
  endDate?: string;
  repeat?: REPEAT_TYPE;
  repeatDetail?: string;
}
