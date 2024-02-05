import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoadingInterceptor } from './core/interceptors/loading.interceptor'
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
    providers: [
      provideAnimations(),
      provideRouter(routes), 
      provideClientHydration(),
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
    ]
};
