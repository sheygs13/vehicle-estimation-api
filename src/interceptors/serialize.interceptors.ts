/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface CustomClassContructor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (...args: any[]): {};
}

export function Serialize(dto: CustomClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// 'implements' used to create a new class that satisfies an interface or abstract class
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run something before a request is handled by thr request handler
    //console.log('context', context);

    return next.handle().pipe(
      map((data: any) => {
        // run something before response is sent out
        //console.log('data', data);

        // return data into an instance of dto
        return plainToInstance(this.dto, data, {
          // very important to add
          // expose/share the properties that are mapped to the 'expose()' directive
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
