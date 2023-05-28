import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPropertyByPath'
})
export class GetPropertyByPathPipe implements PipeTransform {

  transform(value: Object, path: string): unknown {
    return this._deepFind(value, path);
  }

  private _deepFind(obj: any, path: string) {
    let paths = path.split('.');
    let value = {...obj};
    while (paths.length > 0) {
      let key = paths.shift() as string;
      if (!key || !value[key]) return value[key];
      value = value[key];
    }
    return value;
  }

}
