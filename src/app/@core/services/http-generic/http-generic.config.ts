import { HttpHeaders, HttpParams } from '@angular/common/http';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface HttpGenericConfig {
  baseUrl: string;
  resourceName: string;
}

type _HttpHeaders =
  | HttpHeaders
  | {
      [header: string]: string | string[];
    };

type _HttpParams =
  | HttpParams
  | {
      [param: string]: string | string[];
    };

export type Msg = {
  successMsg?: string;
  errorMsg?: string;
};

export type HttpConfig<Entity = any> = {
  params?: _HttpParams;
  headers?: _HttpHeaders;
  url?: string;
  urlPostfix?: string;
  mapResponseFn?: (res: any) => Entity | Entity[];
};

export type HttpGetConfig<Entity = any> = HttpConfig<Entity> & Msg;
export type HttpAddConfig<Entity = any> = HttpConfig<Entity> & Msg;
export type HttpUpdateConfig<Entity = any> = HttpConfig<Entity> & {
  method?: HttpMethod.PUT | HttpMethod.PATCH;
} & Msg;
export type HttpDeleteConfig<Entity = any> = HttpConfig<Entity> & Msg;
