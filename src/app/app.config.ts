import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

// Application configuration: Sets up core Angular features
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Error handling
    provideRouter(routes, withComponentInputBinding()) // Enable routing with automatic route param binding
  ]
};
