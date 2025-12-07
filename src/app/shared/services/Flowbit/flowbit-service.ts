import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlowbitService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  initFlowbite(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(module => {
        // Flowbite JS will initialize automatically after import
      });
    }
  }
}
