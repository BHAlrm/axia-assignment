/* tslint:disable */

import { enableProdMode, NgModuleRef } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Environment } from './environment.model';

enableProdMode();
export const environment: Environment = {
  production: true,
  showDevModule: false,
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
    disableDebugTools();
    return modRef;
  },
  envProviders: []

};
