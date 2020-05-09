import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
    private returnUrl: string;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
    ) {
    }

    get usernameControl() { return this.loginForm.get('username')}
    get passwordControl() { return this.loginForm.get('password')}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        const username = this.loginForm.controls['username'].value;
        const password = this.loginForm.controls['password'].value; 

        this.loading = true;
        this.authService.login(username, password)
            .subscribe(
                () => {
                    this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
