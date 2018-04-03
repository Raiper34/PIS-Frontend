import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {ServiceModel} from "../../shared/models/service.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";
import {serviceListActions} from "../../shared/reducers/serviceList.reducer";
import {RoomModel} from "../../shared/models/room.model";
import {roomListActions} from "../../shared/reducers/roomList.reducer";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../shared/services/api.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnDestroy {

  serviceListSubscription: Subscription;
  serviceListValue: ServiceModel[] = [];
  serviceListSize = 0;
  currentPage = 0;
  searchString = '';

  pickedToDeleteService: ServiceModel;
  isAdmin = false;

  constructor(private store: Store<AppState>,
              private toastService: MzToastService,
              private auth: AuthService,
              private api: ApiService) {
    this.isAdmin = this.auth.getActualUser().role === 'ADMIN';
    this.serviceListSubscription = store.pipe(select('serviceList')).subscribe((serviceList: ServiceModel[]) => {
      this.serviceListValue = serviceList;
    });
    this.store.dispatch({type: serviceListActions.GET_REQUEST});
  }

  get serviceList(): ServiceModel[] {
    const serviceListValue = this.serviceListValue.filter(
      (item) => item.name.includes(this.searchString)
    );
    this.serviceListSize = serviceListValue.length;
    return serviceListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  ngOnDestroy(): void {
    this.serviceListSubscription.unsubscribe();
  }

  deleteService(): void {
    this.api.delete('service', this.pickedToDeleteService.id).subscribe(
      () => {
        this.store.dispatch({type: serviceListActions.GET_REQUEST});
        this.toastService.show('Deletion successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  pickToDelete(service: ServiceModel): void {
    this.pickedToDeleteService = service;
  }

}
