import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// demonstrates lint error: 'pi' is assigned a value but never used  @typescript-eslint/no-unused-vars
// const pi = 3.14; 

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
