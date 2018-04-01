import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {customerListActions} from "../../shared/reducers/customerList.reducer";
import {Subscription} from "rxjs/Subscription";
import {PersonModel} from "../../shared/models/person.model";
import {serviceListActions} from "../../shared/reducers/serviceList.reducer";
import {ServiceModel} from "../../shared/models/service.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnDestroy {

  customerListSubscription: Subscription;
  customerListValue: PersonModel[] = [];
  customerListSize = 0;
  currentPage = 0;
  searchString = '';

  constructor(private store: Store<AppState>) {
    this.customerListSubscription = store.pipe(select('customerList')).subscribe((customerList: PersonModel[]) => {
      this.customerListValue = customerList;
    });
    this.store.dispatch({type: customerListActions.GET_REQUEST});
  }

  get customerList(): PersonModel[] {
    const customerListValue = this.customerListValue.filter(
      (item) => item.surname.includes(this.searchString) ||
        item.firstname.includes(this.searchString)
    );
    this.customerListSize = customerListValue.length;
    return customerListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  ngOnDestroy(): void {
    this.customerListSubscription.unsubscribe();
  }

}
