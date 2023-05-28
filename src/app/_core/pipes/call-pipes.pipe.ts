import { Pipe, PipeTransform } from '@angular/core';
import { PipeConfig } from '../../_shared/components/table-list/table-list';

@Pipe({
  name: 'callPipes'
})
export class CallPipesPipe implements PipeTransform {

  transform(value: any, pipeConfigs?: PipeConfig[]): any {
    if (!pipeConfigs) return value;
    return pipeConfigs.reduce((value, pipeConfig) => {
      const { pipe, args } = pipeConfig;
      return pipe.transform(value, ...args);
    }, value);
  }
}
