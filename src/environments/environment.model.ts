import { NgModuleRef } from '@angular/core';

export interface Environment {
    production: boolean;
    hmr: boolean;
    version: string;
    envProviders: any;
    showDevModule: boolean;
    firebase: {
      apiKey: string;
      authDomain: string;
      databaseURL: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
    };
    decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any>;
}
