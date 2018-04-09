import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MzToastService} from "ng2-materialize";
import {AuthService} from "../../../shared/services/auth.service";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../../../shared/services/api.service";
import {PersonModel} from "../../../shared/models/person.model";
import {customerActions} from "../../../shared/reducers/customer.reducer";
import {employeeActions} from "../../../shared/reducers/employee.reducer";
import * as moment from "moment";

/*
 * Person Edit Component
 * Show form and allow edit or create new persons
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnDestroy {

  personSubscription: Subscription;
  person: PersonModel;
  editForm: FormGroup;
  passwordForm: FormGroup;
  editMode = false;
  isDispatched = false;
  isEmployee = false;
  pageName = 'customer';
  ownProfile = false;

  roleType = [
    {value: 'EMPLOYEE', title: 'Employee'},
    {value: 'ADMIN', title: 'Admin'},
  ];

  activeType = [
    {value: true, title: 'Yes'},
    {value: false, title: 'No'},
  ];

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   * @param {FormBuilder} formBuilder
   * @param {MzToastService} toastService
   * @param {Router} router
   * @param {ApiService} api
   * @param {AuthService} auth
   * @param {ActivatedRoute} route
   */
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
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
      role: [this.roleType[0].value, Validators.required],
      active: [this.activeType[0].value],
      phone: [''],
      email: ['', Validators.email],
      birthDate: [0],
      personalId: [''],
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.editMode = !!params.id;
      this.ownProfile = params.id == this.auth.getActualUser().id;
      if (this.editMode || !this.isEmployee) { //it is editing and it is not employee so we do not create password
        this.editForm.removeControl('password');
        this.editForm.removeControl('passwordAgain');
      }
      if (this.editMode) { //it is edit mode
        this.isDispatched = true;
        this.store.dispatch({type: this.isEmployee ? employeeActions.GET_REQUEST : customerActions.GET_REQUEST, payload: params.id});
      }
    });

    this.personSubscription = store.pipe(select(this.isEmployee ? 'employee' : 'customer')).subscribe((person: PersonModel) => {
      this.person = person;
      if (this.isDispatched) { //it was dispatched, so we have current wanted user
        this.editForm.patchValue({
          ...this.person,
        });
      }
    });
  }

  /**
   * Is Password In Password Form Equal
   * Return if password and passwordAgain are equal or not
   * @returns {boolean}
   */
  get isPasswordInPasswordFormEqual(): boolean {
    return this.passwordForm.get('password').value === this.passwordForm.get('passwordAgain').value;
  }

  /**
   * Is Password In Edit Form Equal
   * Return if password and passwordAgain are equal or not
   * @returns {boolean}
   */
  get isPasswordInEditFormEqual(): boolean {
    return !(this.editMode || !this.isEmployee) ? this.editForm.get('password').value === this.editForm.get('passwordAgain').value : true;
  }

  /**
   * Change password of current employee
   */
  changePassword(): void {
    this.api.update('admin/user', this.person.id, {
      ...this.person,
      password: this.passwordForm.get('password').value,
    }).subscribe(
      () => {
        this.toastService.show(`${this.isEmployee ? 'Employee' : 'Customer'} editation successful!`, 3000, 'green');
        this.router.navigate([`private/${this.isEmployee ? 'employee' : 'customer'}`]);
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  /**
   * Submit form
   * Sudmit form to API, editing or creating of new person
   */
  submitForm(): void {
    const customerPassword = this.isEmployee ? {} : {password: ' '};
    const service = {
      role: 'CUSTOMER',
      ...customerPassword,
      ...this.person,
      ...this.editForm.getRawValue(),
      birthDate: moment(this.editForm.get('birthDate').value).unix() * 1000,
    };
    if (service.passwordAgain) { //remove password again, it is unwanted field
      delete service.passwordAgain;
    }
    if (this.editMode) { //we are editing
      this.api.update(this.isEmployee ? 'admin/user' : 'customer', this.person.id, service).subscribe(
        () => {
          this.toastService.show(`${this.isEmployee ? 'Employee' : 'Customer'} editation successful!`, 3000, 'green');
          this.router.navigate([`private/${this.isEmployee ? 'employee' : 'customer'}`]);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    } else { //we are creating
      this.api.create(this.isEmployee ? 'admin/user' : 'customer', service).subscribe(
        () => {
          this.toastService.show(`${this.isEmployee ? 'Employee' : 'Customer'} creation successful!`, 3000, 'green');
          this.router.navigate([`private/${this.isEmployee ? 'employee' : 'customer'}`]);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    }
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.personSubscription.unsubscribe();
  }

}
