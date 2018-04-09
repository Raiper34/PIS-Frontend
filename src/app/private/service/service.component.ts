import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {ServiceModel} from "../../shared/models/service.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";
import {serviceListActions} from "../../shared/reducers/serviceList.reducer";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../shared/services/api.service";
import {AuthService} from "../../shared/services/auth.service";

/*
 * Service Component
 * Contains table of services
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnDestroy {

  serviceListSubscription: Subscription;
  serviceListValue: ServiceModel[] = [];
  serviceList: ServiceModel[] = [];
  serviceListSize = 0;
  currentPage = 0;
  searchString = '';

  sort = {
    by: 'name',
    direction: 'asc',
  };

  pickedToDeleteService: ServiceModel;
  isAdmin = false;

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   * @param {MzToastService} toastService
   * @param {AuthService} auth
   * @param {ApiService} api
   */
  constructor(private store: Store<AppState>,
              private toastService: MzToastService,
              private auth: AuthService,
              private api: ApiService) {
    this.isAdmin = this.auth.getActualUser().role === 'ADMIN';
    this.serviceListSubscription = store.pipe(select('serviceList')).subscribe((serviceList: ServiceModel[]) => {
      this.serviceListValue = serviceList;
      this.prepareServiceList();
    });
    this.store.dispatch({type: serviceListActions.GET_REQUEST});
  }

  /**
   * Prepare Service List
   * Transform original data into data that are paginated, sorted and filtered
   */
  prepareServiceList(): void {
    const serviceListValue = this.serviceListValue.filter(
      (item) => item.name.includes(this.searchString)
    );
    this.serviceListSize = serviceListValue.length;
    this.serviceList = serviceListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize)
      .sort((item1, item2) => this.sortItems(item1, item2));
  }

  /**
   * Change Page
   * Change page and filter data
   * @param {number} page
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.prepareServiceList();
  }

  /**
   * Search By String
   * Set search string and fitler data
   * @param {string} search
   */
  searchByString(search: string): void {
    this.searchString = search;
    this.prepareServiceList();
  }

  /**
   * Delete Person
   * Method to delete person by picked id
   */
  ngOnDestroy(): void {
    this.serviceListSubscription.unsubscribe();
  }

  /**
   * Delete Service
   * Delete picked service
   */
  deleteService(): void {
    this.api.delete('service', this.pickedToDeleteService.id).subscribe(
      () => {
        this.store.dispatch({type: serviceListActions.GET_REQUEST});
        this.toastService.show('Deletion successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  /**
   * Pick To Delete
   * Pick service to delete
   * @param {ServiceModel} service
   */
  pickToDelete(service: ServiceModel): void {
    this.pickedToDeleteService = service;
  }

  /**
   * Set Sort
   * Set sort object and filter data
   * @param {string} by
   * @param {string} direction
   */
  setSort(by: string, direction: string): void {
    this.sort = {by, direction};
    this.prepareServiceList();
  }

  /**
   * Sort Items
   * Method for sorting function
   * @param {ServiceModel} item1
   * @param {ServiceModel} item2
   * @returns {number}
   */
  sortItems(item1: ServiceModel, item2: ServiceModel): number {
    if (this.sort.direction === 'asc') { //it is ascending
      return item1[this.sort.by] > item2[this.sort.by] ? 1 : item2[this.sort.by] > item1[this.sort.by] ? -1 : 0;
    } else { //it is descending
      return item1[this.sort.by] < item2[this.sort.by] ? 1 : item2[this.sort.by] < item1[this.sort.by] ? -1 : 0;
    }
  }

}
