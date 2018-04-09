import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
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

/*
 * Person Detail Component
 * Show information about persons, eg. employee or customer (specified by isEmployee variable)
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
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
  reservationList: ReservationModel[] = [];
  reservationListSize = 0;
  currentPage = 0;
  searchString = '';

  dispatched = false;

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {MzToastService} toastService
   * @param {ApiService} api
   */
  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: MzToastService,
              private api: ApiService) {
    this.isEmployee = this.route.snapshot.data['type'] == 'employee';
    this.pageName = this.isEmployee ? 'employee' : 'customer';
    this.personSubscription = store.pipe(select(this.isEmployee ? 'employee' : 'customer')).subscribe((person: PersonModel) => {
      this.person = person;
      this.dispatched = true;
      this.store.dispatch({type: reservationListActions.GET_REQUEST});
    });
    this.route.params.subscribe(params => {
      this.store.dispatch({type: this.isEmployee ? employeeActions.GET_REQUEST : customerActions.GET_REQUEST, payload: params.id});
    });

    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
      if (this.dispatched && this.person) { //it was dispatched, so we have current wanted data
        this.prepareReservationList();
      }
    });
  }

  /**
   * Prepare Reservation List
   * Transform original reservation data into data that are paginated, sorted and filtered
   */
  prepareReservationList(): void {
    const reservationListValue = this.reservationListValue
      .filter((item) => (this.isEmployee ? item.creator.id : item.customer.id) == this.person.id)
      .filter((item) => (item.reservedRoom && item.reservedRoom.name.includes(this.searchString)) ||
        (item.customer && item.customer.surname.includes(this.searchString)) ||
        (item.customer && item.customer.firstname.includes(this.searchString))
      );
    this.reservationListSize = reservationListValue.length;
    this.reservationList = reservationListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  /**
   * Change Page
   * Change page of reservation table
   * @param {number} page
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.prepareReservationList();
  }

  /**
   * Delete Person
   * Delete current person
   */
  deletePerson(): void {
    this.api.delete(this.isEmployee ? 'admin/user' : 'customer', this.person.id).subscribe(
      () => {
        this.toastService.show('Deletion successful!', 3000, 'green');
        this.router.navigate([`private/${this.isEmployee ? 'employee' : 'customer'}`]);
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.personSubscription.unsubscribe();
    this.reservationListSubscription.unsubscribe();
  }

}
