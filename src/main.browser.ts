/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';
import { hmrBootstrap } from './hmr';

const bootstrap = () => platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(environment.decorateModuleRef);

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  if (environment.hmr) {
    if (module[ 'hot' ]) {
      return hmrBootstrap(module, bootstrap);
    } else {
      console.error('HMR is not enabled for webpack-dev-server!');
      console.log('Are you using the --hmr flag for ng serve?');
    }
  } else {
    return bootstrap();
  }
}

/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    main().catch((err) => console.error(err));
}

function _domReadyHandler() {
  document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
  main().catch((err) => console.error(err));
}
