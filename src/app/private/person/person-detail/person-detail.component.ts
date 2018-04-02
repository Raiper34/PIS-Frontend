import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {serviceActions} from "../../../shared/reducers/service.reducer";
import {ServiceModel} from "../../../shared/models/service.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../shared/models/app.state";
import {PersonModel} from "../../../shared/models/person.model";
import {customerActions} from "../../../shared/reducers/customer.reducer";
import {employeeActions} from "../../../shared/reducers/employee.reducer";
import {ReservationModel} from "../../../shared/models/reservation.model";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";
import {pageSize} from "../../../shared/components/pagination/pagination.component";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnDestroy {

  personSubscription: Subscription;
  person: PersonModel;
  isEmployee = false;
  pageName = 'customer';

  reservationListSubscription: Subscription;
  reservationListValue: ReservationModel[] = [];
  reservationListSize = 0;
  currentPage = 0;
  searchString = '';

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: MzToastService,
              private api: ApiService) {
    this.isEmployee = this.route.snapshot.data['type'] == 'employee';
    this.pageName = this.isEmployee ? 'employee' : 'customer';
    this.personSubscription = store.pipe(select(this.isEmployee ? 'employee' : 'customer')).subscribe((person: PersonModel) => {
      this.person = person;
    });
    this.route.params.subscribe(params => {
      this.store.dispatch({type: this.isEmployee ? employeeActions.GET_REQUEST : customerActions.GET_REQUEST, payload: params.id});
    });

    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
    });
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
  }

  get reservationList(): ReservationModel[] {
    const reservationListValue = this.reservationListValue
      .filter((item) => (this.isEmployee ? item.creator.id : item.customer.id) == this.person.id)
      .filter((item) => (item.reservedRoom && item.reservedRoom.name.includes(this.searchString)) ||
        (item.customer && item.customer.surname.includes(this.searchString)) ||
        (item.customer && item.customer.firstname.includes(this.searchString))
      );
    this.reservationListSize = reservationListValue.length;
    return reservationListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.reservationListSubscription.unsubscribe();
  }

  deletePerson(): void {
    this.api.delete(this.isEmployee ? 'employee' : 'customer', this.person.id).subscribe(
      () => {
        this.toastService.show('Delete successful!', 3000, 'green');
        this.router.navigate([`private/${this.isEmployee ? 'employee' : 'customer'}`]);
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  ngOnDestroy(): void {
    this.personSubscription.unsubscribe();
  }

}
