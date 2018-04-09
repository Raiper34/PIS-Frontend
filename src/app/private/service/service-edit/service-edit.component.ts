import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {MzToastService} from "ng2-materialize";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {Subscription} from "rxjs/Subscription";
import {ServiceModel} from "../../../shared/models/service.model";
import {serviceActions} from "../../../shared/reducers/service.reducer";

/*
 * Service Edit Component
 * Allow creating and editing services trought form
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnDestroy {

  serviceSubscription: Subscription;
  service: ServiceModel;
  editForm: FormGroup;
  editMode = false;
  isDispatched = false;

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
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0],
      description: [''],
    });

    this.route.params.subscribe(params => {
      this.editMode = !!params.id;
      if (this.editMode) { //it is editing
        this.isDispatched = true;
        this.store.dispatch({type: serviceActions.GET_REQUEST, payload: params.id});
      }
    });

    this.serviceSubscription = store.pipe(select('service')).subscribe((service: ServiceModel) => {
      this.service = service;
      if (this.isDispatched) { //it was dispatched, so it is wanted data from store
        this.editForm.patchValue({
          ...this.service,
        });
      }
    });
  }

  /**
   * Submit Form
   * Method to send data to API, creating or editing service
   */
  submitForm(): void {
    const service = {
      ...this.service,
      ...this.editForm.getRawValue(),
    };
    if (this.editMode) { //we edit service
      this.api.update('service', this.service.id, service).subscribe(
        () => {
          this.toastService.show('Service editation successful!', 3000, 'green');
          this.router.navigate(['private/service']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    } else { //we create service
      this.api.create('service', service).subscribe(
        () => {
          this.toastService.show('Service editation successful!', 3000, 'green');
          this.router.navigate(['private/service']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    }
  }

  /**
   * Delete Person
   * Method to delete person by picked id
   */
  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

}
