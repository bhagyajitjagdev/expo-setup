export enum StorageKeys {
  MILAPP_TOKEN = 'milapp-token',
}

export interface IPagination<R> {
  totalCount: number;
  count: number;
  rows: R[];
}

interface IResult<D> {
  data: D;
  message: string;
}

export interface IRes<D> {
  status: boolean;
  path: string;
  statusCode: number;
  message?: string;
  result: IResult<D>;
}
