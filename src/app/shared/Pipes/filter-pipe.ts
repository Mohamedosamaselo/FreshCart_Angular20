import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true // important to make pipe pure
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText)
      return items;

    return items.filter(items =>
      items.name.toLowerCase().includes(searchText.toLowerCase()))


  }
}
