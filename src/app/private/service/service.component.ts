import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {ServiceModel} from "../../shared/models/service.model";
import {serviceListActions} from "../../shared/reducers/serviceList.reducer";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnDestroy {

  serviceListSubscription: Subscription;
  serviceListValue: ServiceModel[] = [];

  constructor(private store: Store<AppState>) {
    this.serviceListSubscription = store.pipe(select('serviceList')).subscribe((serviceList: ServiceModel[]) => {
      this.serviceListValue = serviceList;
      console.log(serviceList);
    });
    this.store.dispatch({type: serviceListActions.GET_REQUEST});
  }

  ngOnDestroy(): void {
    this.serviceListSubscription.unsubscribe();
  }

}
