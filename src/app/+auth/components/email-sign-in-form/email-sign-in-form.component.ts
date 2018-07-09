import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailSignInModel } from '../../models/email-sign-in.model';

@Component({
  selector: 'app-email-sign-in-form',
  templateUrl: './email-sign-in-form.html',
  styleUrls: ['./email-sign-in-form.scss']
})
export class EmailSignInFormComponent implements OnInit {
  @Input() public loading: boolean = false;
  @Output() public signIn = new EventEmitter<EmailSignInModel>();

  public signInForm: FormGroup;

  constructor() {
  }

  public ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      }),
      isKeepLogin: new FormControl(false)
    }, {
      asyncValidators: [],
      updateOn: 'blur'
    });
  }

  public isControlValid(control: string) {
    return this.signInForm.get(control).valid;
  }

  public isControlInValid(control: string) {
    return this.signInForm.dirty && !this.isControlValid(control);
  }

  public hasError(control: string, errorCode: string) {
    return this.signInForm.get(control).dirty
      && this.signInForm.get(control).hasError(errorCode);
  }

  public onSubmit() {
    if (this.signInForm.valid) {
      this.signIn.emit(this.signInForm.getRawValue());
    }
  }
}
