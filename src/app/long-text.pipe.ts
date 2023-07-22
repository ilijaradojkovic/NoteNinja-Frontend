import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longText'
})
export class LongTextPipe implements PipeTransform {

  transform(value: String): String {
    if(value.length>=20) return value.substring(0,20).concat("...");
    return value;
  }

}
