import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {ApiService} from "../../shared/services/api.service";
import {Router} from "@angular/router";
import {MzToastService} from "ng2-materialize";

/*
 * Login Component
 * Component that holds login form
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  /**
   * Constructor widh Dependency Injection
   * @param {FormBuilder} formBuilder
   * @param {Router} router
   * @param {MzToastService} toastService
   * @param {ApiService} api
   * @param {AuthService} auth
   */
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

  /**
   * Login
   * Login user with provided form data
   */
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
