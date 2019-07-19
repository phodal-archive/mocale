export enum ModelType {

}

export enum VALIDATE_ERROR {
  EMPTY = '空值',
  MIN_LENGTH = '长度大于 2'
}

export class ErrorModel {
  type: string;
  field?: string;
  error: string;
}
