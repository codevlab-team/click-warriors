import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpGenericService } from '../http-generic';

@Injectable({
  providedIn: 'root',
})
export class ServersService extends HttpGenericService {
  constructor() {
    super({
      baseUrl: environment.url,
      resourceName: 'servers',
    });
  }
}
