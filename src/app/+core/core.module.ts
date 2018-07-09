import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import '../../styles/styles.scss';
import { AsideComponent } from './components/aside';
import { HeaderComponent } from './components/header';
import { FormProgressbarComponent } from './components/form-progressbar/form-progressbar.component';
import { SubHeaderComponent } from './components/sub-header';
import { AppComponent } from './containers/app';

export const components = [
  AppComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: components,
  exports: components
})
export class CoreModule {
  public static forRoot() {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
