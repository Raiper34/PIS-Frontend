import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {customerListActions} from "../../shared/reducers/customerList.reducer";
import {Subscription} from "rxjs/Subscription";
import {PersonModel} from "../../shared/models/person.model";
import {serviceListActions} from "../../shared/reducers/serviceList.reducer";
import {ServiceModel} from "../../shared/models/service.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";
import {ActivatedRoute} from "@angular/router";
import {employeeListActions} from "../../shared/reducers/employeeList.reducer";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnDestroy {

  personListSubscription: Subscription;
  personListValue: PersonModel[] = [];
  personListSize = 0;
  currentPage = 0;
  searchString = '';
  isEmployee = false;
  pageName = 'customer';

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.isEmployee = this.route.snapshot.data['type'] == 'employee';
    this.pageName = this.isEmployee ? 'employee' : 'customer';
    this.personListSubscription = store.pipe(select(this.isEmployee ? 'employeeList' : 'customerList')).subscribe((customerList: PersonModel[]) => {
      this.personListValue = customerList;
    });
    this.store.dispatch({type: this.isEmployee ? employeeListActions.GET_REQUEST : customerListActions.GET_REQUEST});
  }

  get customerList(): PersonModel[] {
    const customerListValue = this.personListValue.filter(
      (item) => item.surname.includes(this.searchString) ||
        item.firstname.includes(this.searchString)
    );
    this.personListSize = customerListValue.length;
    return customerListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  ngOnDestroy(): void {
    this.personListSubscription.unsubscribe();
  }

}
