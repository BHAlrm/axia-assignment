/* tslint:disable */
import { ApplicationRef, NgModuleRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { Environment } from './environment.model';

Error.stackTraceLimit = Infinity;
require('zone.js/dist/long-stack-trace-zone');

export const environment: Environment = {
  production: false,
  showDevModule: true,
  hmr: HMR,
  version: VERSION,
  firebase: {
    apiKey: 'AIzaSyAUgfNCB4eDddDOWYghr4LUPvXO-Ct_PXo',
    authDomain: 'movie-45572.firebaseapp.com',
    databaseURL: 'https://movie-45572.firebaseio.com',
    projectId: 'movie-45572',
    storageBucket: 'movie-45572.appspot.com',
    messagingSenderId: '69154580487'
  },
  decorateModuleRef(modRef: NgModuleRef<any>) {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  },
  envProviders: []
};
