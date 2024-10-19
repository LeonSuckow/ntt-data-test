import { HttpParams } from '@angular/common/http';

export function addQueryParams(params: any): HttpParams {
  let queryParams = new HttpParams();

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      queryParams = queryParams.set(key, params[key]);
    }
  });

  return queryParams;
}
