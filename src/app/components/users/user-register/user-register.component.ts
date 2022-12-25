import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { UserService } from 'src/app/services/user/user.service';
import { Subscription, switchMap } from 'rxjs';

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
export class UserRegisterComponent implements OnInit, OnDestroy {
  registerUserForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    if (this.userSubmitSubscription) {
      this.userSubmitSubscription.unsubscribe();
    }
  }

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

  get role() {
    return this.registerUserForm.get('role');
  }

  userSubmitSubscription!: Subscription;
  submit() {
    if (!this.registerUserForm.valid) {
      return;
    }
    const { firstName, lastName, email, password, role } =
      this.registerUserForm.value;
    this.userSubmitSubscription = this.authService
      .saveUser(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({
            uid,
            email,
            firstName,
            lastName,
            displayName: firstName,
            role,
          })
        ),
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

  // updateUser
}
