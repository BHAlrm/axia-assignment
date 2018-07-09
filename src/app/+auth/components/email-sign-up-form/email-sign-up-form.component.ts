import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailSignInModel } from '../../models/email-sign-in.model';

@Component({
  selector: 'app-email-sign-up-form',
  templateUrl: './email-sign-up-form.html',
  styleUrls: ['./email-sign-up-form.scss']
})
export class EmailSignUpFormComponent implements OnInit {
  @Input() public loading: boolean = false;
  @Output() public register = new EventEmitter<EmailSignInModel>();
  public registerForm: FormGroup;
  public userRoles = ['MANAGER' , 'TEAMLEADER' , 'FLOORSTAFF'];

  constructor() {
  }

  public ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      }),
      role: new FormControl('',
        { validators: [Validators.required] })
    }, {
      updateOn: 'blur'
    });
  }

  public isControlValid(control: string) {
    return this.registerForm.get(control).valid;
  }

  public isControlInValid(control: string) {
    return this.registerForm.dirty && !this.isControlValid(control);
  }

  public hasError(control: string, errorCode: string) {
    return this.registerForm.get(control).dirty
      && this.registerForm.get(control).hasError(errorCode);
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      this.register.emit(this.registerForm.getRawValue());
    }
  }
}
