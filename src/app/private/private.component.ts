import { Component } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {

  menu = [
    {link: '/private/reservation', title: 'Reservations'},
    {link: '/private/room', title: 'Rooms'},
    {link: '/private/service', title: 'Services'},
    {link: '/private/customer', title: 'Customer'},
    {link: '/private/employee', title: 'Employee'},
  ];

  constructor(private toastService: MzToastService,
              private auth: AuthService,
              private router: Router) { }

  logout(event: any): void {
    event.preventDefault();
    this.auth.logout().subscribe(
      () => {
        this.toastService.show('Logout successful!', 3000, 'green');
        this.router.navigate(['public']);
      },
      (error) => {
        this.toastService.show(error.message, 3000, 'red');
      }
    );
  }

}
