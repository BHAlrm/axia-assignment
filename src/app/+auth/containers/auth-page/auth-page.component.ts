import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IdentifyModel } from '../../../+core/models/identify.model';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnInit, OnDestroy {

  constructor() {
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
  }
}
