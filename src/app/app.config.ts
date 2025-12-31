import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Api_Base_Url } from './token/token';
import { provideToastr } from 'ngx-toastr';
import { tokenInterceptor } from './core/interceptors/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
    ),
    provideAnimations(), // Animation provider
    provideToastr(), // Toastr providers
    importProvidersFrom(CarouselModule),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),

    {
      provide: Api_Base_Url,
      useValue: `https://ecommerce.routemisr.com/api/v1`,
    }
  ],
};
function provideAnimattions():
  | import('@angular/core').Provider
  | import('@angular/core').EnvironmentProviders {
  throw new Error('Function not implemented.');
}
