import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { first, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { UserService } from 'src/app/services/user/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registerUserForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor() {}

  ngOnInit(): void {}

  get email() {
    return this.registerUserForm.get('email');
  }

  get password() {
    return this.registerUserForm.get('password');
  }

  get confirmPassword() {
    return this.registerUserForm.get('confirmPassword');
  }

  get name() {
    return this.registerUserForm.get('name');
  }

  submit() {
    if (!this.registerUserForm.valid) {
      return;
    }
  }
}
