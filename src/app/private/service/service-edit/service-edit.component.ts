import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../../shared/models/app.state";
import * as moment from "moment";
import {select, Store} from "@ngrx/store";
import {MzToastService} from "ng2-materialize";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {Subscription} from "rxjs/Subscription";
import {ReservationModel} from "../../../shared/models/reservation.model";
import {ServiceModel} from "../../../shared/models/service.model";
import {reservationActions} from "../../../shared/reducers/reservation.reducer";
import {serviceActions} from "../../../shared/reducers/service.reducer";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";
import {serviceListActions} from "../../../shared/reducers/serviceList.reducer";

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
      if (this.editMode) {
        this.isDispatched = true;
        this.store.dispatch({type: serviceActions.GET_REQUEST, payload: params.id});
      }
    });

    this.serviceSubscription = store.pipe(select('service')).subscribe((service: ServiceModel) => {
      this.service = service;
      if (this.isDispatched) {
        this.editForm.patchValue({
          ...this.service,
        });
      }
    });
  }

  submitForm(): void {
    const service = {
      ...this.service,
      ...this.editForm.getRawValue(),
    };
    if (this.editMode) {
      this.api.update('service', this.service.id, service).subscribe(
        () => {
          this.toastService.show('Service editation successful!', 3000, 'green');
          this.router.navigate(['private/service']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    } else {
      this.api.create('service', service).subscribe(
        () => {
          this.toastService.show('Service editation successful!', 3000, 'green');
          this.router.navigate(['private/service']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    }
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

}
