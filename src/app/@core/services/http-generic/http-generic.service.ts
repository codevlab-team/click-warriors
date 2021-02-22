import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';
import {
  HttpAddConfig,
  HttpConfig,
  HttpDeleteConfig,
  HttpGenericConfig,
  HttpGetConfig,
  HttpMethod,
  HttpUpdateConfig,
} from './http-generic.config';

type ID = string | number;

const mapResponse = <T>(config?: HttpConfig<T>) =>
  map((res: T) =>
    config && !!config.mapResponseFn ? config.mapResponseFn(res) : res
  );

const isID = (id: any): Boolean =>
  typeof id === 'string' || typeof id === 'number';

export class HttpGenericService {
  private readonly http: HttpClient;
  private readonly httpConfig: HttpGenericConfig;
  private readonly notifier: NotificationsService;

  constructor(protected config: HttpGenericConfig) {
    this.http = inject(HttpClient);
    this.httpConfig = config;
    this.notifier = inject(NotificationsService);
  }

  get api(): string {
    const { baseUrl, resourceName } = this.httpConfig;
    return `${baseUrl}/${resourceName}`;
  }

  getHttp(): HttpClient {
    return this.http;
  }

  getConfig(): HttpGenericConfig {
    return this.httpConfig;
  }

  get<T>(config?: HttpGetConfig<T>): Observable<T>;
  get<T>(id?: ID, config?: HttpGetConfig<T>): Observable<T>;
  get<T>(
    idOrConfig?: ID | HttpGetConfig<T>,
    config?: HttpGetConfig<T>
  ): Observable<T> {
    const method = HttpMethod.GET;
    const isSingle = isID(idOrConfig);
    const entityId = isSingle ? (idOrConfig as ID) : undefined;
    const conf = (!isSingle ? (idOrConfig as HttpGetConfig<T>) : config) || {};
    const url = this.resolveUrl(config, entityId);
    return this.http.request(method, url, conf).pipe(
      mapResponse<any>(config),
      tap(() => this.dispatchSuccess(config?.successMsg || '')),
      catchError((error) => this.handleError(error, config?.errorMsg || ''))
    ) as Observable<T>;
  }

  add<T>(entity: T, config?: HttpAddConfig<T>): Observable<T> {
    const method = HttpMethod.POST;
    const url = this.resolveUrl(config);
    const configWithBody = { ...config, body: entity };
    return this.http.request(method, url, configWithBody).pipe(
      mapResponse<any>(config),
      tap(() => this.dispatchSuccess(config?.successMsg || '')),
      catchError((error) => this.handleError(error, config?.errorMsg || ''))
    ) as Observable<T>;
  }

  update<T>(
    id: ID,
    entity: Partial<T>,
    config?: HttpUpdateConfig<T>
  ): Observable<T> {
    const method = config?.method || HttpMethod.PUT;
    const url = this.resolveUrl(config, id);
    const configWithBody = { ...config, body: entity };
    return this.http.request(method, url, configWithBody).pipe(
      mapResponse<any>(config),
      tap(() => this.dispatchSuccess(config?.successMsg || '')),
      catchError((error) => this.handleError(error, config?.errorMsg || ''))
    ) as Observable<T>;
  }

  delete<T>(id: ID, config?: HttpDeleteConfig<T>): Observable<T> {
    const method = HttpMethod.DELETE;
    const url = this.resolveUrl(config, id);
    return this.http.request(method, url, config).pipe(
      mapResponse<any>(config),
      tap(() => this.dispatchSuccess(config?.successMsg || '')),
      catchError((error) => this.handleError(error, config?.errorMsg || ''))
    ) as Observable<T>;
  }

  protected resolveUrl(config?: HttpConfig, id?: any) {
    const { url, urlPostfix } = Object(config) as HttpConfig;
    let final = this.api;

    if (url) {
      return url;
    }

    if (id) {
      final += `/${id}`;
    }

    if (urlPostfix) {
      final += `/${urlPostfix}`;
    }

    return final;
  }

  protected dispatchSuccess(message: string): void {
    if (message) {
      this.notifier.showSuccess(message);
    }
  }

  protected handleError(error: any, message: string): Observable<never> {
    if (message) {
      this.notifier.showError(message);
    }

    return throwError(error);
  }
}
