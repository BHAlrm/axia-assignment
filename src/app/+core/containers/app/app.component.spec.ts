import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../reducers';
import { AppComponent } from './app.component';

describe('application.component', () => {

  describe('UI logic', () => {
    let fixture: ComponentFixture<AppComponent>;
    let instance: AppComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot(reducers, { metaReducers })],
        declarations: [AppComponent],
        schemas: [NO_ERRORS_SCHEMA]
      });

      fixture = TestBed.createComponent(AppComponent);
      instance = fixture.componentInstance;
    });

    it('should compile', () => {
      fixture.detectChanges();

      /**
       * The login form is a presentational component, as it
       * only derives its state from inputs and communicates
       * externally through outputs. We can use snapshot
       * tests to validate the presentation state of this component
       * by changing its inputs and snapshotting the generated
       * HTML.
       *
       * We can also use this as a validation tool against changes
       * to the component's template against the currently stored
       * snapshot.
       */
      expect(fixture).toMatchSnapshot();
    });
  });

});
