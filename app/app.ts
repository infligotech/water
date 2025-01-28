import { Application } from '@nativescript/core';
import { GoogleMaps } from '@nativescript/google-maps';

Application.on(Application.launchEvent, () => {
  // Initialize Google Maps
  GoogleMaps.init();
  console.log('Application launched');
});

Application.on(Application.suspendEvent, () => {
  console.log('Application suspended');
});

Application.on(Application.resumeEvent, () => {
  console.log('Application resumed');
});

Application.on(Application.exitEvent, () => {
  console.log('Application exiting');
});

Application.on(Application.uncaughtErrorEvent, (args: any) => {
  console.error('Uncaught error:', args.error);
  console.error('Stack trace:', args.error.stack);
});

Application.run({ moduleName: 'app-root' });