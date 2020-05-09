import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  formErrors = {};

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) {
  }

  ngOnInit() {
      this.registerForm = this.buildForm();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get emailControl() { return this.registerForm.get('email')}
  get usernameControl() { return this.registerForm.get('username')}
  get passwordControl() { return this.registerForm.get('password')}
  get passwordConfirmControl() { return this.registerForm.get('confirmPassword')}

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;

      this.authService.register(this.registerForm.value)
          .subscribe(
              () => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }

  private checkPasswords(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group(
        {
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        },
        {
            validator: this.checkPasswords('password', 'confirmPassword')
        }
    );
  }
}
