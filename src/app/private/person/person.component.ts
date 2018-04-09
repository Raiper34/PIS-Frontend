import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {customerListActions} from "../../shared/reducers/customerList.reducer";
import {Subscription} from "rxjs/Subscription";
import {PersonModel} from "../../shared/models/person.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";
import {ActivatedRoute} from "@angular/router";
import {employeeListActions} from "../../shared/reducers/employeeList.reducer";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../shared/services/api.service";

/*
 * Person Component
 * Contains table of customer or empoyees, it depends on isEmployee variable
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnDestroy {

  personListSubscription: Subscription;
  personListValue: PersonModel[] = [];
  personList: PersonModel[] = [];
  personListSize = 0;
  currentPage = 0;
  searchString = '';
  isEmployee = false;
  pageName = 'customer';

  pickedToDeletePerson: PersonModel;

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   * @param {ActivatedRoute} route
   * @param {MzToastService} toastService
   * @param {ApiService} api
   */
  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private toastService: MzToastService,
              private api: ApiService) {
    this.isEmployee = this.route.snapshot.data['type'] == 'employee';
    this.pageName = this.isEmployee ? 'employee' : 'customer';
    this.personListSubscription = store.pipe(select(this.isEmployee ? 'employeeList' : 'customerList')).subscribe((customerList: PersonModel[]) => {
      this.personListValue = customerList;
      this.preparePersonList();
    });
    this.store.dispatch({type: this.isEmployee ? employeeListActions.GET_REQUEST : customerListActions.GET_REQUEST});
  }

  /**
   * Prepare Person List
   * Transform original data into data that are paginated, sorted and filtered
   */
  preparePersonList(): void {
    const customerListValue = this.personListValue.filter(
      (item) => item.surname.includes(this.searchString) ||
        item.firstname.includes(this.searchString)
    );
    this.personListSize = customerListValue.length;
    this.personList = customerListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  /**
   * Change Page
   * Change page number and then filtrate data
   * @param {number} page
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.preparePersonList();
  }

  /**
   * Search By String
   * Set search string and then filtrate data
   * @param {string} search
   */
  searchByString(search: string): void {
    this.searchString = search;
    this.preparePersonList();
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.personListSubscription.unsubscribe();
  }

  /**
   * Delete Person
   * Method to delete person by picked id
   */
  deletePerson(): void {
    this.api.delete(this.isEmployee ? 'admin/user' : 'customer', this.pickedToDeletePerson.id).subscribe(
      () => {
        this.store.dispatch({type: this.isEmployee ? employeeListActions.GET_REQUEST : customerListActions.GET_REQUEST});
        this.toastService.show('Deletion successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  /**
   * Pick To Delete
   * Pick person to delete
   * @param {PersonModel} person
   */
  pickToDelete(person: PersonModel): void {
    this.pickedToDeletePerson = person;
  }

  /**
   * Change Active Status
   * Change active status of given person
   * @param {PersonModel} person
   */
  changeActiveStatus(person: PersonModel): void {
    this.api.update('admin/user', person.id, {
      ...person,
      active: !person.active,
    }).subscribe(
      () => {
        this.store.dispatch({type: employeeListActions.GET_REQUEST});
        this.toastService.show('Changing active status successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

}
