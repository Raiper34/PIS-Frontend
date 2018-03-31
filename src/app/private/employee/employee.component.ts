import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {PersonModel} from "../../shared/models/person.model";
import {employeeListActions} from "../../shared/reducers/employeeList.reducer";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnDestroy {

  employeeListSubscription: Subscription;
  employeeListValue: PersonModel[] = [];

  constructor(private store: Store<AppState>) {
    this.employeeListSubscription = store.pipe(select('employeeList')).subscribe((employeeList: PersonModel[]) => {
      this.employeeListValue = employeeList;
      console.log(employeeList);
    });
    this.store.dispatch({type: employeeListActions.GET_REQUEST});
  }

  ngOnDestroy(): void {
    this.employeeListSubscription.unsubscribe();
  }

}
