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
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      isAdmin: new FormControl(),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get firstName() {
    return this.registerUserForm.get('firstName');
  }

  get lastName() {
    return this.registerUserForm.get('lastName');
  }

  get email() {
    return this.registerUserForm.get('email');
  }

  get password() {
    return this.registerUserForm.get('password');
  }

  get confirmPassword() {
    return this.registerUserForm.get('confirmPassword');
  }

  get isAdmin() {
    return this.registerUserForm.get('isAdmin');
  }

  submit() {
    if (!this.registerUserForm.valid) {
      return;
    }
    const { firstName, lastName, email, password, isAdmin } =
      this.registerUserForm.value;
    this.authService
      .saveUser(firstName, lastName, email, password)
      .pipe(
        this.toast.observe({
          success: 'a new user has been added',
          loading: 'saving ...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/users']);
      });
  }
}
