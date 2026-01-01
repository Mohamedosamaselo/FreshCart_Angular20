import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true, // important to make pipe pure ,
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    if (!items || !searchText)// check on items and searchText
      return items;

    return items.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()));

  }

}
