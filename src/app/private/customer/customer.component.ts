import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {customerListActions} from "../../shared/reducers/customerList.reducer";
import {Subscription} from "rxjs/Subscription";
import {PersonModel} from "../../shared/models/person.model";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnDestroy {

  customerListSubscription: Subscription;
  customerListValue: PersonModel[] = [];

  constructor(private store: Store<AppState>) {
    this.customerListSubscription = store.pipe(select('customerList')).subscribe((customerList: PersonModel[]) => {
      this.customerListValue = customerList;
      console.log(customerList);
    });
    this.store.dispatch({type: customerListActions.GET_REQUEST});
  }

  ngOnDestroy(): void {
    this.customerListSubscription.unsubscribe();
  }

}
