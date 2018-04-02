import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {roomActions} from "../../../shared/reducers/room.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomModel} from "../../../shared/models/room.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MzToastService} from "ng2-materialize";
import {AuthService} from "../../../shared/services/auth.service";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../../../shared/services/api.service";
import {PersonModel} from "../../../shared/models/person.model";
import {customerActions} from "../../../shared/reducers/customer.reducer";
import {employeeActions} from "../../../shared/reducers/employee.reducer";
import * as moment from "moment";

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnDestroy {

  personSubscription: Subscription;
  person: PersonModel;
  editForm: FormGroup;
  editMode = false;
  isDispatched = false;
  isEmployee = false;
  pageName = 'customer';

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private toastService: MzToastService,
              private router: Router,
              private api: ApiService,
              private auth: AuthService,
              private route: ActivatedRoute) {
    this.isEmployee = this.route.snapshot.data['type'] == 'employee';
    this.pageName = this.isEmployee ? 'employee' : 'customer';
    this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['CUSTOMER'],
      phone: [''],
      email: ['', Validators.email],
      birthDate: [0],
      personalId: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.editMode = !!params.id;
      if (this.editMode) {
        this.isDispatched = true;
        this.store.dispatch({type: this.isEmployee ? employeeActions.GET_REQUEST : customerActions.GET_REQUEST, payload: params.id});
      }
    });

    this.personSubscription = store.pipe(select(this.isEmployee ? 'employee' : 'customer')).subscribe((person: PersonModel) => {
      this.person = person;
      if (this.isDispatched) {
        this.editForm.patchValue({
          ...this.person,
        });
      }
    });
  }

  submitForm(): void {
    const service = {
      role: 'CUSTOMER',
      ...this.person,
      ...this.editForm.getRawValue(),
      birthDate: moment(this.editForm.get('birthDate').value).unix() * 1000,
    };
    if (this.editMode) {
      this.api.update(this.isEmployee ? 'employee' : 'customer', this.person.id, service).subscribe(
        () => {
          this.toastService.show(`${this.isEmployee ? 'Employee' : 'Customer'} editation successful!`, 3000, 'green');
          this.router.navigate([`private/${this.isEmployee ? 'employee' : 'customer'}`]);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    } else {
      this.api.create(this.isEmployee ? 'employee' : 'customer', service).subscribe(
        () => {
          this.toastService.show(`${this.isEmployee ? 'Employee' : 'Customer'} editation successful!`, 3000, 'green');
          this.router.navigate([`private/${this.isEmployee ? 'employee' : 'customer'}`]);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    }
  }

  ngOnDestroy(): void {
    this.personSubscription.unsubscribe();
  }

}
