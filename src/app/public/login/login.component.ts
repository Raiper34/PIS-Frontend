import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastService: MzToastService,
              private api: ApiService,
              private auth: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.auth.login(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value,
    ).subscribe(
      () => {
        this.toastService.show('Login successful!', 3000, 'green');
        this.router.navigate(['private']);
      },
      () => this.toastService.show('Wrong username or password!', 3000, 'red')
    );
  }

}
